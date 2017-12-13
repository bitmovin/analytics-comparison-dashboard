const dimensions = [
  { name: 'STARTUPTIME', label: 'Total Startup Time' },
  { name: 'PLAYER_STARTUPTIME', label: 'Player Startup Time' },
  { name: 'VIDEO_STARTUPTIME', label: 'Video Startup Time' }
];

const aggregations = [
  { name: 'median', label: 'median' },
  { name: 'percentile', param: 95, label: '95th percentile' }
]

const startupTimeQueries = dimensions
  .map(dimension => aggregations.map((aggregation) => ({
    dimension: dimension.name,
    aggregation: aggregation.name,
    aggregationParam: aggregation.param,
    filters: [
      [dimension.name, 'GT', 0],
      ['PAGE_LOAD_TYPE', 'EQ', 1],
    ],
    type: 'time',
    label: `${dimension.label} (${aggregation.label})`,
  })))
  .reduce((totalArray, dimArray) => [...totalArray, ...dimArray], []); // flatten

const impressionQueries = [
  {
    label: 'Total impressions',
    dimension: 'IMPRESSION_ID',
    aggregation: 'count',
    filters: [['VIDEO_STARTUPTIME', 'GT', 0]],
    type: 'amount',
  },
  {
    label: 'Unique Users',
    dimension: 'USER_ID',
    aggregation: 'count',
    filters: [['VIDEO_STARTUPTIME', 'GT', 0]],
    type: 'amount',
  },
  {
    label: 'Total page loads',
    dimension: 'IMPRESSION_ID',
    aggregation: 'count',
    filters: [['PLAYER_STARTUPTIME', 'GT', 0]],
    type: 'amount',
  }
];

const quality = [
  {
    label: 'Average Bitrate',
    dimension: 'VIDEO_BITRATE',
    aggregation: 'avg',
    filters: [['VIDEO_BITRATE', 'GT', 0]],
    type: 'bitrate'
  },
  {
    label: 'Scale Factor',
    dimension: 'SCALE_FACTOR',
    aggregation: 'avg',
    filters: [],
    type: 'factor'
  },
  {
    label: 'Average View Time',
    dimension: 'VIEWTIME',
    aggregation: 'avg',
    filters: [],
    type: 'hightime'
  }
]

const errorQueries = [
  {
    label: 'Total Errors',
    dimension: 'IMPRESSION_ID',
    aggregation: 'count',
    filters: [['ERROR_CODE', 'GT', 0]],
    type: 'lowestAmount'
  },
  {
    label: 'Buffering Events',
    dimension: 'BUFFERED',
    aggregation: 'count',
    filters: [['BUFFERED', 'GT', 0]],
    type: 'lowestAmount'
  },
  {
    label: 'Average Buffering Time',
    dimension: 'BUFFERED',
    aggregation: 'avg',
    filters: [['BUFFERED', 'GT', 0]],
    type: 'time'
  }
];

const queryGroups = [
  { label: 'Impressions', queries: impressionQueries },
  { label: 'Startup times', queries: startupTimeQueries },
  { label: 'Quality', queries: quality },
  { label: 'Errors', queries: errorQueries },
]

export default queryGroups;
