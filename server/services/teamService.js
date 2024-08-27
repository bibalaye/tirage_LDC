const db = require('../db');

async function getAllTeams() {
  const [rows] = await db.query('SELECT * FROM teams ORDER BY uefa_coefficient DESC');
  return rows;
}

async function getTeamById(id) {
  const [rows] = await db.query('SELECT * FROM teams WHERE id = ?', [id]);
  return rows[0];
}

module.exports = {
  getAllTeams,
  getTeamById
};