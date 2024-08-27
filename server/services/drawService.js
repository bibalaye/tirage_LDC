const db = require('../db');

async function performDraw() {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Récupérer toutes les équipes par chapeau
    const [teams] = await connection.query('SELECT * FROM teams ORDER BY pot, uefa_coefficient DESC');

    // Regrouper les équipes par chapeau
    const potTeams = teams.reduce((acc, team) => {
      if (!acc[team.pot]) acc[team.pot] = [];
      acc[team.pot].push(team);
      return acc;
    }, {});

    // Effectuer le tirage
    for (const team of teams) {
      const drawnOpponents = await drawOpponentsForTeam(connection, team, potTeams);
      for (const opponent of drawnOpponents) {
        await connection.query('INSERT INTO draw_results (team_id, opponent_id) VALUES (?, ?)', [team.id, opponent.id]);
      }
    }

    await connection.commit();
    return await getDrawResults();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function drawOpponentsForTeam(connection, team, potTeams) {
  const drawnOpponents = [];
  const potCounts = {};

  for (const pot in potTeams) {
    potCounts[pot] = 2;
  }

  while (Object.values(potCounts).some(count => count > 0)) {
    for (const pot in potCounts) {
      if (potCounts[pot] > 0) {
        const eligibleOpponents = potTeams[pot].filter(opponent => 
          opponent.id !== team.id && 
          opponent.country !== team.country && 
          !isAlreadyDrawn(team.id, opponent.id, drawnOpponents)
        );

        if (eligibleOpponents.length === 0) {
          throw new Error(`Impossible de trouver un adversaire éligible pour l'équipe ${team.name} dans le chapeau ${pot}`);
        }

        const opponent = getRandomOpponent(eligibleOpponents);
        drawnOpponents.push(opponent);
        potCounts[pot]--;
      }
    }
  }

  return drawnOpponents;
}

function isAlreadyDrawn(teamId, opponentId, drawnOpponents) {
  return drawnOpponents.some(opponent => opponent.id === opponentId);
}

function getRandomOpponent(opponents) {
  const randomIndex = Math.floor(Math.random() * opponents.length);
  return opponents[randomIndex];
}

async function getDrawResults() {
  const [rows] = await db.query(`
    SELECT dr.id, t1.name AS team_name, t1.country AS team_country, t1.pot AS team_pot,
           t2.name AS opponent_name, t2.country AS opponent_country, t2.pot AS opponent_pot
    FROM draw_results dr
    JOIN teams t1 ON dr.team_id = t1.id
    JOIN teams t2 ON dr.opponent_id = t2.id
    ORDER BY t1.pot, t1.uefa_coefficient DESC, t2.pot, t2.uefa_coefficient DESC
  `);
  return rows;
}

module.exports = {
  performDraw,
  getDrawResults
};