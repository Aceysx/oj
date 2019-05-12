const init = {
  total: 10,
  finish: 5,
  avg: 77.7,
  highest: 100,
  lowest: 20
}
export default (state = init, action) => {
  if (action.type === 'PAPER_STATISTICS') {
    return action.data
  } else {
    return state
  }
}
