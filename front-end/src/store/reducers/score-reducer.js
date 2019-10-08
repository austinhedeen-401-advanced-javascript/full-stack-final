export default (state = [], {type, payload}) => {
  switch(type) {
    case 'SCORES_LOAD':
      return payload;
    case 'SCORE_ADD':
      return [...state, payload];
    default:
      return state;
  }
};
