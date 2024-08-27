const express = require('express');
const router = express.Router();
const { getAllTeams, getTeamById } = require('../services/teamService');

router.get('/', async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await getTeamById(req.params.id);
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ message: 'Équipe non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;