
export default function reducer(state, action) {
  Object.freeze(state)
  const oldState = Object.assign({}, state)
  switch (action.type) {
    case 'addPosibilities':
      let name = action.name 
      let value = action.value 
      oldState.moves[name] = {...oldState.moves[name], ...value}
      return oldState 

    case 'addResult':
      oldState.results.push(action.result)
      return  oldState

    case 'resetResults':
      oldState.moves
      return  { moves: {default: {}}, results: [], gameName: 'default' }

    default:
      throw Error("Specify Action")
  }
}