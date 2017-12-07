const attributes = [
  { collectionName: 'countries', singleName: 'country', attribute: 'COUNTRY', comparable: true },
  { collectionName: 'players', singleName: 'player', attribute: 'PLAYER', comparable: true },
  { collectionName: 'CDN providers', singleName: 'CDN provider', attribute: 'CDN_PROVIDER' },
  { collectionName: 'browsers', singleName: 'browser', attribute: 'BROWSER', comparable: true },
  { collectionName: 'experiments', singleName: 'experiment', attribute: 'EXPERIMENT_NAME', comparable: true },
]

export const allAttributes = attributes.map(a => Object.freeze(a));
export const comparableAttributes = allAttributes.filter(({ comparable }) => comparable);
