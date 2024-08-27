const { getCache, setCache } = require('../cache');
const { fetchTeamsFromAPI } = require('../services/teamsService');

async function getTeams(req, res) {
  try {
    const cachedTeams = await getCache('teams');
    if (cachedTeams) {
      return res.json(JSON.parse(cachedTeams));
    }

    const teams = await fetchTeamsFromAPI();
    await setCache('teams', JSON.stringify(teams));
    res.json(teams);
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

module.exports = { getTeams };
