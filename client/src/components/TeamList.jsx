import React from 'react';
import { motion } from 'framer-motion';

const TeamList = ({ teams }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {teams.map((team, index) => (
        <motion.div
          key={team.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white bg-opacity-10 p-4 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg"
        >
          <h3 className="text-lg font-semibold text-uefa-gold">{team.name}</h3>
          <p className="text-sm text-gray-300">{team.country}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamList;
