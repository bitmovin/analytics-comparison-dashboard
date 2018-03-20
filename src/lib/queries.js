const dimensions = [
  {
    name: 'STARTUPTIME',
    label: 'Total Startup Time',
    info: 'The sum of player startup time and video startup time'
  },
  {
    name: 'PLAYER_STARTUPTIME',
    label: 'Player Startup Time',
    info: 'How long the player needed until it was ready for playback.'
   },
  {
    name: 'VIDEO_STARTUPTIME',
    label: 'Video Startup Time',
    info: 'The time it took until the first frame was displayed after video playback is started'
  }
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
    info: dimension.info
  })))
  .reduce((totalArray, dimArray) => [...totalArray, ...dimArray], []); // flatten

const impressionQueries = [
  {
    label: 'Total impressions',
    dimension: 'IMPRESSION_ID',
    aggregation: 'count',
    filters: [['VIDEO_STARTUPTIME', 'GT', 0]],
    type: 'amount',
    info: 'Number of single video views'
  },
  {
    label: 'Unique Users',
    dimension: 'USER_ID',
    aggregation: 'count',
    filters: [['VIDEO_STARTUPTIME', 'GT', 0]],
    type: 'amount',
    info: 'Users who watched one or more videos'
  },
  {
    label: 'Total page loads',
    dimension: 'IMPRESSION_ID',
    aggregation: 'count',
    filters: [['PLAYER_STARTUPTIME', 'GT', 0]],
    type: 'amount',
    info: 'How often a page containing one or more videos has been loaded'
  }
];

const quality = [
  {
    label: 'Average Bitrate',
    dimension: 'VIDEO_BITRATE',
    aggregation: 'avg',
    filters: [['VIDEO_BITRATE', 'GT', 0]],
    type: 'bitrate',
    info: 'Your videos get delivered on average with this bitrate'
  },
  {
    label: 'Scale Factor',
    dimension: 'SCALE_FACTOR',
    aggregation: 'avg',
    type: 'factor',
    info: 'Values below 0 indicate playback in a window smaller than the video dimensions, above 0 means the opposite'
  },
  {
    label: 'Average View Time',
    dimension: 'VIEWTIME',
    aggregation: 'avg',
    type: 'highestTime',
    info: 'How long your viewers watched a single video on average'
  }
]

const errorQueries = [
  {
    label: 'Total Errors',
    dimension: 'IMPRESSION_ID',
    aggregation: 'count',
    filters: [['ERROR_CODE', 'GT', 0]],
    type: 'lowestAmount',
    info: 'The number of all errors that occurred in the players of all viewers'
  },
  {
    label: 'Error percentage',
    dimension: 'IMPRESSION_ID',
    aggregation: 'count',
    queries: [
      {
        filters: [['ERROR_CODE', 'GT', 0]],
      },
      {
        // just perform main query without any additions
      }
    ],
    combineQueries: (totalErrors, totalImpressions) => totalErrors / totalImpressions,
    type: 'percentage',
    info: 'The percentage of video impressions which yielded an error'
  },
  {
    label: 'Buffering Events',
    dimension: 'BUFFERED',
    aggregation: 'count',
    filters: [['BUFFERED', 'GT', 0]],
    type: 'lowestAmount',
    info: 'How many times your videos needed to rebuffer during playback'
  },
  {
    label: 'Rebuffer percentage',
    dimension: 'IMPRESSION_ID',
    aggregation: 'count',
    queries: [
      {
        filters: [['BUFFERED', 'GT', 0]],
      },
      {
        filters: [['VIDEO_STARTUPTIME', 'GT', 0]],
        // just perform main query without any additions
      }
    ],
    combineQueries: (totalBuffering, totalImpressions) => totalBuffering / totalImpressions,
    type: 'percentage',
    info: 'The percentage of video impressions which needed to rebuffer during playback'
  },
  {
    label: 'Median Buffering Time',
    dimension: 'BUFFERED',
    aggregation: 'median',
    filters: [['BUFFERED', 'GT', 0]],
    type: 'time',
    info: 'How a typical rebuffering took'
  },
];

const seekTimeQueries = [
  {
    label: 'Average Seek Time',
    dimension: 'SEEKED',
    aggregation: 'avg',
    filters: [['SEEKED', 'GT', 0]],
    type: 'time',
    info: 'The average time it took after the user seeked in a video until it started playing again'
  },
  {
    label: 'Seek percentage',
    dimension: 'IMPRESSION_ID',
    aggregation: 'count',
    queries: [
      {
        filters: [['SEEKED', 'GT', 0]],
      },
      {
        // just perform main query without any additions
      }
    ],
    combineQueries: (totalSeeks, totalImpressions) => totalSeeks / totalImpressions,
    type: 'percentage',
    info: 'The percentage of video impressions in which the viewers seeked'
  },
]

const queryGroups = [
  { label: 'Impressions', queries: impressionQueries },
  { label: 'Startup times', queries: startupTimeQueries },
  { label: 'Quality', queries: quality },
  { label: 'Problems', queries: errorQueries },
  { label: 'Seek times', queries: seekTimeQueries },
]

export default queryGroups;
