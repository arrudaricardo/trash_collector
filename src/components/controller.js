import React,{useContext} from 'react';
import Button from '@material-ui/core/Button';
import { Pcontext } from "./game";

export default () => {

    const {state, dispatch} = useContext(Pcontext)

    function handleGridChange(event) {
        dispatch({type:'setGridSize', payload: event.target.value})
    }
    function handleChanceChange(event) {
        dispatch({type:'setChangeOfTrash', payload: event.target.value})
    }

    function handleRestart(event) {
        event.preventDefault();
        dispatch({type:'resetGridArray'})
    }

return (
    <div className="grid-input">
        <div className="grid-size-input">
            Grid Size:
            <input
                type="number"
                min="1"
                onChange={handleGridChange}
                value={state.grid.gridSize}
            />
        </div>
        <div className="grid-change-input">
            Trash:
            <input
                type="number"
                min="0"
                max="100"
                step="5"
                onChange={handleChanceChange}
                value={state.grid.chanceOfTrash}
            />
            %
        </div>
        <div>
            <Button variant="contained"  color="primary" onClick={handleRestart}>
                {" "}
                Reset{" "}
            </Button>
        </div>
    </div>
);

}
