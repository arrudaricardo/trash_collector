
export default function choiceReducer(state, action) {
  switch (action.type) {
    case 'addPosibilities':
      return  {...state, ...action.payload}
    default:
      return state;
  }
}