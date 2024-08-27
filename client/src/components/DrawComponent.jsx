import React from 'react';
import { motion } from 'framer-motion';

const DrawComponent = ({ drawResult }) => {
  const groups = drawResult.reduce((acc, result) => {
    if (!acc[result.group_name]) {
      acc[result.group_name] = [];
    }
    acc[result.group_name].push(result);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Object.entries(groups).map(([groupName, teams], groupIndex) => (
        <motion.div
          key={groupName}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
          className="bg-white bg-opacity-10 p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg"
        >
          <h3 className="text-2xl font-bold mb-4 text-uefa-gold">Groupe {groupName}</h3>
          <ul>
            {teams.map((team, teamIndex) => (
              <motion.li
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: teamIndex * 0.1 + groupIndex * 0.2 }}
                className="mb-2 text-lg"
              >
                {team.team_name}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default DrawComponent;