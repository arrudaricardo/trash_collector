import React,{useContext} from 'react';
import Button from '@material-ui/core/Button';
import { Pcontext } from "../game";
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    button: {
        marginBottom: '0.3em',
    },

}));

export default () => {
    const classes = useStyles();

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
        <Tooltip title={`size: ${state.grid.gridSize}x${state.grid.gridSize}`}placement="top">
        <div className="grid-size-input">
            Grid Size:
            <input
                type="number"
                min="1"
                onChange={handleGridChange}
                value={state.grid.gridSize}
            />
        </div>
        </Tooltip>

        <Tooltip title="chance per slot"placement="top">
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
        </Tooltip>


        <div>
        <Tooltip title="reset grid"placement="top">
            <Button className={classes.button} variant="contained"  color="primary" onClick={handleRestart}>
                {" "}
                Reset{" "}
            </Button>
        </Tooltip>
        </div>
    </div>
);

}
