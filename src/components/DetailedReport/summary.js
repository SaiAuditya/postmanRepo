import React from 'react';
import { Bar } from 'react-chartjs-2';
import Card from '../UI/Card'

const data = {
  labels: ['file1', 'file2'],
  datasets: [
    {
      label: '# of Passed',
      data: [],
      backgroundColor:  'rgba(10, 133, 96)'
    },
    {
      label: '# of Failed',
      data: [],
      backgroundColor:   'rgba(173, 43, 10)'
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
        barThickness:6
      },
    ],
  },
};

const StackedBar = (props) => {

    data.datasets[0].data  = props.passArray
    data.datasets[1].data  = props.failArray
    data.labels = props.fileNames

   // console.log(props.dataSets)
    return(
    <Card>
    <Bar data={data} options={options} height={70}/>
    </Card>
    );
    };

export default StackedBar;