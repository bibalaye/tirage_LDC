const { performDrawLogic } = require('../services/drawService');

async function performDraw(req, res) {
  try {
    const { teams } = req.body;
    const drawResult = await performDrawLogic(teams);
    res.json(drawResult);
  } catch (error) {
    console.error('Erreur lors du tirage au sort:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

module.exports = { performDraw };
