export const WeeklyBar = {
  height: 100,
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

  datasets: [
    {
      label: 'DECLINED/CANCELLED TRANSACTIONS',
      data: [60, 50, 45, 50, 60, 70, 45],
      backgroundColor: '#f55c29',
    },
    {
      label: 'APPROVED TRANSACTIONS',
      data: [500, 350, 400, 890, 960, 1005, 800],
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

export const WeeklyArea = {
  height: 100,
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      data: [560, 400, 445, 940, 1020, 1075, 845],
      borderColor: '#5E35B1',
      borderWidth: 1,
      fill: true,
      backgroundColor: '#D1C4E9',
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
