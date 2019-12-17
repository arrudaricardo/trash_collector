import React,{useContext} from 'react';
import Button from '@material-ui/core/Button';
import { Pcontext } from "../game";
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    button: {
        marginBottom: '0.3em',
    },
    input: {
        display: 'flex',
        alignItems: "center",
        margin: theme.spacing(2),
        maxWidth: '30em',
    },
    textField: {
        marginLeft: '0.8em',
        marginRight: '0.8em',

    }

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
    <div className={classes.input}>

        <Tooltip title={`size: ${state.grid.gridSize}x${state.grid.gridSize}`}placement="top">
            <TextField
                    className={classes.textField}
                    label="Grid Size"
                    type="number"
                    margin="dense"
                    min="1"
                    step="1"
                    onChange={handleGridChange}
                    value={state.grid.gridSize}
                    />
        </Tooltip>

        <Tooltip title="chance per slot"placement="top">
            <TextField
                    label="Trash Chance %"
                    type="number"
                    size='small'
                    margin="dense"
                    min="0"
                    max="100"
                    step="5"
                    onChange={handleChanceChange}
                    value={state.grid.chanceOfTrash}
                    />
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
