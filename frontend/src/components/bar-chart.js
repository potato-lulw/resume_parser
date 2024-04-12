import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, registerables} from 'chart.js';

// Register the Category Scale
Chart.register(CategoryScale);
Chart.register(...registerables)

const BarChart = ({ jobTitle, wordFrequencies }) => {
  // Extract words and frequencies from wordFrequencies array
  const words = wordFrequencies.map(entry => entry.word);
  const frequencies = wordFrequencies.map(entry => entry.frequency);

  const chartData = {
    labels: words,
    datasets: [
      {
        label: 'Frequency',
        data: frequencies,
        backgroundColor: 'rgb(102, 252, 241)', // Blue color for bars
      },
    ],
  };

  return (
    <div className='mt-10'>
      <h2>Include these in your {jobTitle} resume</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              type: 'category', // Set the scale type to 'category'
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
