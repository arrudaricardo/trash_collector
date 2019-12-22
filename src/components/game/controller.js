import React,{useContext} from 'react';
import Button from '@material-ui/core/Button';
import { Pcontext } from "../game";
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
    button: {
        marginBottom: '0.3em',
    },
    input: {
        display: 'flex',
        alignItems: "center",
        maxWidth: '30em',
        margin: 'auto'
    },
    textField: {
        marginLeft: '0.8em',
        marginRight: '0.8em',

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100
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

    const handleNameSelect = e => {
        dispatch({type:'changeGameName', payload: e.target.value})
    };

return (
    <div className={classes.input}>

        <Tooltip title={`size of the grid:${state.grid.gridSize}x${state.grid.gridSize}`}placement="top">
            <TextField
                    className={classes.textField}
                    style={{width: '200px'}}
                    inputProps={{step: 1, min:2}}
                    label="Grid Size"
                    type="number"
                    margin="dense"
                    onChange={handleGridChange}
                    value={state.grid.gridSize}
                    />
        </Tooltip>

        <Tooltip title="chance per slot of having a trash"placement="top">
            <TextField
                    style={{width: '15em'}}
                    label="Trash %"
                    type="number"
                    margin="dense"
                    inputProps={{step: 5, min:0, max:100}}
                    onChange={handleChanceChange}
                    value={state.grid.chanceOfTrash}
                    />
                    
            </Tooltip>

        <Tooltip title="Robot Name"placement="top">
            <FormControl className={classes.formControl}>
                <InputLabel  id="label">Robot</InputLabel>
                <Select
                    id="select-name"
                    value={state.grid.gameName}
                    onChange={handleNameSelect}
                >
                    {Object.keys(state.moves).map(name => (
                        <MenuItem key={name} value={name}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
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
