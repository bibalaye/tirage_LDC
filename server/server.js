const express = require('express');
const cors = require('cors');
require('dotenv').config();

const teamRoutes = require('./routes/teamRoutes');
const drawRoutes = require('./routes/drawRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/teams', teamRoutes);
app.use('/api/draw', drawRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));