import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GroupChart = ({ drawResult }) => {
  // Regrouper les résultats par groupe
  const groupedResults = drawResult.reduce((acc, result) => {
    if (!acc[result.group_name]) {
      acc[result.group_name] = [];
    }
    acc[result.group_name].push(result);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(groupedResults).map(groupName => `Groupe ${groupName}`),
    datasets: [
      {
        data: Object.values(groupedResults).map(group => group.length),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#45B39D', '#F4D03F',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Répartition des équipes par groupe',
        color: 'white',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="bg-uefa-blue p-4 rounded-lg shadow-xl">
      <Pie data={data} options={options} />
    </div>
  );
};

export default GroupChart;