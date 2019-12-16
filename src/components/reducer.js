import { generateGridArray } from "./util";

export default function reducer(state, action) {
    Object.freeze(state);
    const oldState = Object.assign({}, state);
    function resetGridArray(oldState) {
        const [gridArray, robotPos] = generateGridArray(
            oldState.grid.gridSize,
            oldState.grid.chanceOfTrash
        );
        oldState.grid.gridArray = gridArray;
        oldState.grid.robotPos = robotPos;
        //reset run variables
        oldState.grid.runs = 1;
        oldState.grid.gameOver = false;
        oldState.grid.moves = 0;
        oldState.grid.trashColleted = 0;

        return oldState;
    }
    switch (action.type) {
        case "addPosibilities":
            let name = action.name;
            let value = action.value;
            oldState.moves[name] = { ...oldState.moves[name], ...value };
            return oldState;

        case "loadRobotPossibilities":
            oldState.moves[action.name] = action.value
            return oldState;

        case "changeSpeed":
            console.log(action)
            oldState.grid.speed = action.value 
            return oldState;

        case "resetPosibilities":
            oldState.moves[action.payload] = {}
            return oldState;

        case "addResult":
            oldState.results.push(action.result);
            return oldState;

        case "resetResults":
            return { moves: { default: {} }, results: [], gameName: "default" };

        case "setGridSize":
            oldState.grid.gridSize = action.payload;

            return resetGridArray(oldState);

        case "setChangeOfTrash":
            oldState.grid.chanceOfTrash = action.payload;
            return resetGridArray(oldState);

        case "resetGridArray":
            return resetGridArray(oldState);

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

        case "addGameName":
            oldState.grid.gameName = action.payload;
            oldState.moves[action.payload] = {}
            return oldState;

        case "changeGameName":
            oldState.grid.gameName = action.payload;
            return oldState;

        case "deleteGameName":
            if (action.payload !== 'default'){
                delete oldState.moves[action.payload]
            }
            oldState.grid.gameName = 'default'
            return oldState;

        case "deleteGameNameResult":
            if (action.payload === 'all') {
                oldState.results = [] 
            } else {
                oldState.results = oldState.results.filter( e => e.gameName != action.payload)
            }
        return oldState

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
//         trashColleted: 0

//     }
// }
