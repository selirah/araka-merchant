export const YearlyBar = {
  height: 100,
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],

  datasets: [
    {
      label: 'DECLINED/CANCELLED TRANSACTIONS',
      data: [100, 400, 300, 400, 600, 550, 450, 350, 300, 200, 150, 200],
      backgroundColor: '#f55c29',
    },
    {
      label: 'APPROVED TRANSACTIONS',
      data: [
        2000,
        3000,
        5000,
        3500,
        4000,
        2500,
        9000,
        6050,
        7500,
        9500,
        3200,
        9922,
      ],
      backgroundColor: '#35b9e6',
    },
  ],

  options: {
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontSize: 10,
        padding: 30,
        boxWidth: 10,
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: '#e5e9f2',
          },
          ticks: {
            beginAtZero: true,
            fontSize: 10,
            fontColor: '#182b49',
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            fontSize: 11,
            fontColor: '#182b49',
          },
        },
      ],
    },
  },
};

export const YearlyArea = {
  height: 100,
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      data: [
        2000,
        3000,
        5000,
        3500,
        4000,
        2500,
        9000,
        6050,
        7500,
        9500,
        3200,
        9922,
      ],
      borderColor: '#03A9F4',
      borderWidth: 1,
      fill: true,
      backgroundColor: '#B3E5FC',
      pointHoverBorderColor: 'transparent',
    },
  ],
  options: {
    maintainAspectRatio: true,
    hover: {
      mode: 'nearest',
      intersect: false,
    },

    layout: {
      padding: {
        left: -10,
        right: 0,
        top: 2,
        bottom: -10,
      },
    },
    legend: {
      display: false,
      labels: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
            color: '#e5e9f2',
          },
          ticks: {
            beginAtZero: true,
            fontSize: 10,
            display: false,
            stepSize: 20,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },

          ticks: {
            beginAtZero: true,
            fontSize: 11,
            display: false,
          },
        },
      ],
    },
  },
};
