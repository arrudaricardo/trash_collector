import { generateGridArray } from "./util";

export default function reducer(state, action) {
    let [gridArray, robotPos] = [null, null];
    Object.freeze(state);
    const oldState = Object.assign({}, state);
    function resetGridArray(oldState) {
          const [gridArray, robotPos] = generateGridArray(
                oldState.grid.gridSize,
                oldState.grid.chanceOfTrash
            );
            oldState.grid.gridArray = gridArray;
            oldState.grid.robotPos = robotPos;
            return oldState
    }
    switch (action.type) {
        case "addPosibilities":
            let name = action.name;
            let value = action.value;
            oldState.moves[name] = { ...oldState.moves[name], ...value };
            return oldState;

        case "addResult":
            oldState.results.push(action.result);
            return oldState;

        case "resetResults":
            return { moves: { default: {} }, results: [], gameName: "default" };

        case "setGridSize":
            oldState.grid.gridSize = action.payload;

            return resetGridArray(oldState)

        case "setChangeOfTrash":
            oldState.grid.chanceOfTrash = action.payload;
            return resetGridArray(oldState)


        case "resetGridArray":
            return resetGridArray(oldState)

        case "setGameOver":
            oldState.grid.gameOver = action.payload;
            return oldState;

        case "setMoves":
            oldState.grid.moves = action.payload;
            return oldState;

        case "setTrashCollected":
            oldState.grid.trashColleted = action.payload;
            return oldState;

        case "setGridArray":
            oldState.grid.gridArray = action.payload;
            return oldState;

        case "setRobotPos":
            oldState.grid.robotPos = action.payload;
            return oldState;

        default:
            throw Error("Specify Action");
    }
}

// const initialState = {
//     moves: {default: {}},
//     results: [],
//     grid: {
//         gameName: 'default',
//         gridArray: initgrid,
//         robotPos: initrobot,
//         gridSize,
//         chanceOfTrash,
//         runs: 0,
//         gameOver: false,
//         moves: 0,
//         trashColleted:0

//     }
// }
