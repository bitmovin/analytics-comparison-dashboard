const attributes = [
  {
    collectionName: 'countries',
    singleName: 'country',
    attribute: 'COUNTRY',
    comparable: true,
    filterable: true,
  },
  {
    collectionName: 'players',
    singleName: 'player',
    attribute: 'PLAYER',
    comparable: true,
    filterable: true,
  },
  {
    collectionName: 'player versions',
    singleName: 'player version',
    attribute: 'PLAYER_VERSION',
    comparable: true,
    filterable: true,
  },
  {
    collectionName: 'CDN providers',
    singleName: 'CDN provider',
    attribute: 'CDN_PROVIDER',
    comparable: false,
    filterable: true,
  },
  {
    collectionName: 'browsers',
    singleName: 'browser',
    attribute: 'BROWSER',
    comparable: true,
    filterable: true,
  },
  {
    collectionName: 'experiments',
    singleName: 'experiment',
    attribute: 'EXPERIMENT_NAME',
    comparable: true,
    filterable: true,
  },
  {
    collectionName: 'live',
    singleName: 'live',
    attribute: 'IS_LIVE',
    comparable: false,
    filterable: true,
  },
  {
    collectionName: 'periods',
    singleName: 'period',
    attribute: 'PERIOD',
    comparable: true,
    filterable: false,
  },
]

export const allAttributes = attributes.map(a => Object.freeze(a));
export const comparableAttributes = allAttributes.filter(({ comparable }) => comparable);
export const filterableAttributes = allAttributes.filter(({ filterable }) => filterable);
