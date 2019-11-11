import React, { useState, useContext, useEffect } from "react";
import Box from "./box";
import Pbutton from "./posibilities_button";
import { Pcontext } from "./game";
import { stateValues } from "./util";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogSelect from "./nameDialog";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(theme => ({
    delete: {
        margin: theme.spacing(1)
    },
    input: {
        display: "none"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 80
    },
    container: {
        display: "flex",
        justifyContent: "flex-end"
    },
    fab: {
        margin: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
 arrow: {
    margin: theme.spacing(1),
  },
}));

const Pgrid = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(Pcontext);

    const [action, setAction] = useState("");
    const [stateSum, setStateSum] = useState(835791);

    const [gridState, setState] = useState({
        up: "empty",
        down: "empty",
        left: "empty",
        right: "empty",
        current: "empty"
    });

    const getStateSum = () => {
        let stateSum = 1;
        Object.keys(gridState).forEach(dir => {
            stateSum *= stateValues[dir][gridState[dir]];
        });
        return stateSum;
    };

    const resetPosibilities = event => {
        event.preventDefault();
            dispatch({
                type: "resetPosibilities",
                payload: state.grid.gameName
            }); 
        setState({
            up: "empty",
            down: "empty",
            left: "empty",
            right: "empty",
            current: "empty"
        });
    };

    const deleteGameName = event => {
        event.preventDefault();
            dispatch({
                type: "deleteGameName",
                payload: state.grid.gameName
            });
    }

    // update action for the state sum
    // update grid sum
    useEffect(() => {
        setStateSum(getStateSum());
        setAction(state.moves[state.grid.gameName][stateSum]);
    },[Object.keys(gridState)]);

    function toggleState(event, position, isRobot = false) {
        event.preventDefault();
        let dir = gridState[position];
        // return next gridState
        let states;
        if (!isRobot) {
            states = ["empty", "wall", "trash"];
        } else {
            states = ["empty", "trash"];
        }
        let idx = states.indexOf(dir);
        let nextDir = states[(idx + 1) % states.length];
        let newState = { ...gridState, [position]: nextDir };
        return newState;
    }

    const handleNameSelect = e => {
        dispatch({type:'changeGameName', payload: e.target.value})
    };

    return (
        <div>
            <div className={classes.container} noValidate autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel id="label">Name</InputLabel>
                    <Select
                        id="select-name"
                        value={state.grid.gameName}
                        onChange={handleNameSelect}
                    >
                        {Object.keys(state.moves).map(name => (
                            <MenuItem value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Tooltip title="Delete">
                <IconButton
                    disabled={state.grid.gameName === 'default'}
                    onClick={deleteGameName}
                    className={classes.delete}
                    aria-label="delete"
                >
                    <DeleteIcon />
                </IconButton>
                </Tooltip>

                <Tooltip title="Reset">
                    <IconButton onClick={resetPosibilities} aria-label="delete" className={classes.arrow} size="small">
                        <ArrowDownwardIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>

                <DialogSelect/>

            </div>
            <div style={{ display: "flex" }}>
                <div id="left">
                    <Box visible={false} hasTrash={false} />
                    <div onClick={e => setState(toggleState(e, "left"))}>
                        <Box
                            visible={gridState.left === "wall" ? false : true}
                            hasTrash={gridState.left === "trash" ? true : false}
                        />
                    </div>
                </div>
                <div>
                    <div id="up" onClick={e => setState(toggleState(e, "up"))}>
                        <Box
                            visible={gridState.up === "wall" ? false : true}
                            hasTrash={gridState.up === "trash" ? true : false}
                        />
                    </div>

                    <div
                        id="current"
                        onClick={e => setState(toggleState(e, "current", true))}
                    >
                        <Box
                            hasRobot={true}
                            hasTrash={
                                gridState.current === "trash" ? true : false
                            }
                        />
                    </div>

                    <div
                        id="down"
                        onClick={e => setState(toggleState(e, "down"))}
                    >
                        <Box
                            visible={gridState.down === "wall" ? false : true}
                            hasTrash={gridState.down === "trash" ? true : false}
                        />
                    </div>
                </div>
                <div id="right">
                    <Box visible={false} hasTrash={false} />

                    <div onClick={e => setState(toggleState(e, "right"))}>
                        <Box
                            visible={gridState.right === "wall" ? false : true}
                            hasTrash={
                                gridState.right === "trash" ? true : false
                            }
                        />
                    </div>
                </div>
            </div>
            <Pbutton
                gridState={gridState}
                action={action}
                stateSum={stateSum}
            />
            <div />

            <div style={{ padding: "1em", maxHeight: "10px" }}>
                {/* <Pstate gridState={gridState}/> */}
            </div>
        </div>
    );
};

export default Pgrid;
