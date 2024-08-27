import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import DrawComponent from './components/DrawComponent';
import GroupChart from './components/GroupChart';
import TeamList from './components/TeamList';
import './App.css';

function App() {
  const [teams, setTeams] = useState([]);
  const [drawResult, setDrawResult] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des équipes:', error);
      }
    };
    fetchTeams();
  }, []);

  const performDraw = async () => {
    setIsDrawing(true);
    try {
      const response = await axios.post('http://localhost:5000/api/draw/perform');
      setTimeout(() => {
        setDrawResult(response.data);
        setIsDrawing(false);
      }, 3000); // Simulation d'un tirage de 3 secondes
    } catch (error) {
      console.error('Erreur lors du tirage au sort:', error);
      setIsDrawing(false);
    }
  };

  return (
    <div className="App bg-gradient-to-b from-uefa-blue to-blue-900 min-h-screen text-white">
      <header className="App-header p-6 bg-uefa-blue shadow-lg">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold text-uefa-gold mb-4 text-center"
        >
          UEFA Champions League
        </motion.h1>
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-semibold text-white text-center"
        >
          Tirage au Sort
        </motion.h2>
      </header>
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence>
          {!drawResult.length && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 rounded-lg p-6 shadow-xl"
            >
              <TeamList teams={teams} />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
                whileTap={{ scale: 0.95 }}
                onClick={performDraw}
                disabled={isDrawing}
                className="mt-8 bg-uefa-gold text-uefa-blue font-bold py-4 px-8 rounded-full text-2xl hover:bg-yellow-400 transition duration-300 disabled:opacity-50 mx-auto block shadow-lg"
              >
                {isDrawing ? 'Tirage en cours...' : 'Effectuer le Tirage'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isDrawing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-t-4 border-uefa-gold rounded-full"
              ></motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {drawResult.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 rounded-lg p-6 shadow-xl"
            >
              <DrawComponent drawResult={drawResult} />
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <h2 className="text-3xl font-bold mb-6 text-center text-uefa-gold">Visualisation des Groupes</h2>
                <GroupChart drawResult={drawResult} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;