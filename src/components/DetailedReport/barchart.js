import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Post', 'Get'],
  datasets: [
    {
      label: '# of requests',
      data: [1000, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = (props) => {
    data.datasets[0].data = props.data;
   // console.log("bar" + props.data)
    return(
  <>
    <Bar data={data} options={options} />
  </>
    );
    }

export default VerticalBar;