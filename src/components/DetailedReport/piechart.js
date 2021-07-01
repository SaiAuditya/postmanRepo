import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Failed', 'Passed'],
  datasets: [
    {
      label: '#',
      data :[20,30],
      backgroundColor: [
        'rgba(173, 43, 10)',
        'rgba(10, 133, 96)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)', 
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = (props) => {
    
    const dataArr = props.data;
    const newData = {...data}
    newData.datasets[0].data = dataArr
    //console.log(newData)
    return(
    <Doughnut data={newData} height={50} />
    )

    }

export default DoughnutChart;