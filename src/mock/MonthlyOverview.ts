export const MonthlyBar = {
  height: 100,
  labels: [
    'Jan 01',
    'Jan 02',
    'Jan 03',
    'Jan 04',
    'Jan 05',
    'Jan 06',
    'Jan 07',
    'Jan 08',
    'Jan 09',
    'Jan 10',
    'Jan 11',
    'Jan 12',
    'Jan 13',
    'Jan 14',
    'Jan 15',
    'Jan 16',
    'Jan 17',
    'Jan 18',
    'Jan 19',
    'Jan 20',
    'Jan 21',
    'Jan 22',
    'Jan 23',
    'Jan 24',
    'Jan 25',
    'Jan 26',
    'Jan 27',
    'Jan 28',
    'Jan 29',
    'Today',
  ],

  datasets: [
    {
      label: 'DECLINED/CANCELLED TRANSACTIONS',
      data: [
        20,
        60,
        50,
        45,
        50,
        60,
        70,
        40,
        45,
        35,
        25,
        30,
        10,
        40,
        30,
        40,
        60,
        55,
        45,
        35,
        30,
        20,
        15,
        20,
        10,
        40,
        30,
        40,
        60,
        55,
      ],
      backgroundColor: '#f55c29',
    },
    {
      label: 'APPROVED TRANSACTIONS',
      data: [
        10,
        40,
        30,
        40,
        60,
        55,
        45,
        35,
        30,
        20,
        15,
        20,
        20,
        60,
        50,
        45,
        50,
        60,
        70,
        40,
        45,
        35,
        25,
        30,
        50,
        45,
        50,
        60,
        70,
        40,
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

export const MonthlyArea = {
  height: 100,
  labels: [
    'Jan 01',
    'Jan 02',
    'Jan 03',
    'Jan 04',
    'Jan 05',
    'Jan 06',
    'Jan 07',
    'Jan 08',
    'Jan 09',
    'Jan 10',
    'Jan 11',
    'Jan 12',
    'Jan 13',
    'Jan 14',
    'Jan 15',
    'Jan 16',
    'Jan 17',
    'Jan 18',
    'Jan 19',
    'Jan 20',
    'Jan 21',
    'Jan 22',
    'Jan 23',
    'Jan 24',
    'Jan 25',
    'Jan 26',
    'Jan 27',
    'Jan 28',
    'Jan 29',
    'Today',
  ],
  datasets: [
    {
      data: [
        10,
        40,
        30,
        40,
        60,
        55,
        45,
        35,
        30,
        20,
        15,
        20,
        20,
        60,
        50,
        45,
        50,
        60,
        70,
        40,
        45,
        35,
        25,
        30,
        50,
        45,
        50,
        60,
        70,
        40,
      ],
      borderColor: '#FFA000',
      borderWidth: 1,
      fill: true,
      backgroundColor: '#FFE082',
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
