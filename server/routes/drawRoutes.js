const express = require('express');
const router = express.Router();
const { performDraw, getDrawResults } = require('../services/drawService');

router.post('/perform', async (req, res) => {
  try {
    const results = await performDraw();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/results', async (req, res) => {
  try {
    const results = await getDrawResults();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;