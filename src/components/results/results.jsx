import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Pcontext } from "../game";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        overflowX: "auto"
    },
    table: {
        // minWidth: 650,
    },
    header: {
        fontWeight: 900,
        background: "linear-gradient(30deg, #FFFF 10%, #ffeee6 100%)"
    },
    median: {
        fontWeight: "bold",
        background: "linear-gradient(30deg, #FFfF 30%, #cce6ff 100%)"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    input: {
        display: 'flex',
        margin: theme.spacing(1),

    },
    delete: {
        margin: theme.spacing(1)
    },
    inputs: {
        display: "flex",
        alignItems: "center",
        maxWidth: '38em',
        margin: 'auto',
        flexWrap: 'wrap'
    },
    multiplier: {
        display: "flex",
        maxWidth: '20em',
    }
}));

export default function Results() {
    const { state, dispatch } = useContext(Pcontext);

    const [selectName, setSelectName] = useState("all");
    const [median, setMedian] = useState({
        score: 0,
        moves: 0,
        trash: 0,
        gridSize: 0
    });

    const classes = useStyles();

    function getScore(moves, trashCollected) {
        return ((moves * state.grid.movesMultiplier) + (trashCollected * state.grid.trashMultiplier) )
    }

    useEffect(() => {
        if (state.results.length > 0) {
            let sum = {
                score: 0,
                moves: 0,
                trash: 0,
                gridSize: 0
            };
            state.results.forEach(e => {
                if (e.gameName === selectName || selectName === "all") {
                    sum.score += e.score === "fail" ? 0 : getScore(e.moves, e.trashsCollected)
                    sum.moves += e.moves;
                    sum.trash += e.trashsCollected;
                    sum.gridSize += e.gridSize;
                }
            });
            let itemsNum =
                selectName === "all"
                    ? state.results.length
                    : state.results.reduce((acc, val) => {
                        if (val.gameName === selectName) {
                            return acc + 1;
                        } else {
                            return acc;
                        }
                    }, 0);

            Object.keys(sum).forEach(key => {
                let result = sum[key] / itemsNum;
                sum[key] = result.toFixed(2);
            });

            setMedian(sum);
        }
    }, [state.results, selectName, state.grid.trashMultiplier, state.grid.movesMultiplier]);

    const handleChangeName = event => {
        setSelectName(event.target.value);
    };

    const deleteGameResult = event => {
        event.preventDefault();
        dispatch({
            type: "deleteGameNameResult",
            payload: selectName
        });
        setSelectName('all')
    };

    return (
        <div>
            <div className={classes.inputs}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="label">Game</InputLabel>
                    <Select
                        id="select-name"
                        value={selectName}
                        margin="none"
                        onChange={handleChangeName}
                    >
                        {[...new Set(state.results.map(el => el.gameName))].map(gameName =>
                            <MenuItem key={gameName} value={gameName}>{gameName}</MenuItem>
                        )}

                        <MenuItem value="all">All</MenuItem>
                    </Select>
                </FormControl>

                <div className={classes.multiplier}> 
                <Tooltip title="Multiplier for moves score" placement="top">
                    <TextField
                            style={{paddingLeft:'0.4em', paddingRight:'0.4em'}}
                            id="filled-number"
                            label="Moves Multiplier"
                            type="number"
                            margin="dense"
                            size="small"
                            inputProps={{step: 1, min:0}}
                            onChange={(e) => dispatch({type:"changeMovesMultiplier", value: e.target.value})}
                            value={state.grid.movesMultiplier}
                            />
                </Tooltip>

                <Tooltip title="Multiplier for Trash Collected" placement="top">
                    <TextField
                            id="filled-number"
                            label="Trash Multiplier"
                            type="number"
                            margin="dense"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{step: 1, min:0}}
                            onChange={(e) => dispatch({type:"changeTrashMultiplier", value: e.target.value})}
                            value={state.grid.trashMultiplier}
                            />
                </Tooltip>
</div>
                <IconButton
                    onClick={deleteGameResult}
                    className={classes.delete}
                    aria-label="delete"
                >
                    <Tooltip title={`delete ${selectName} results`}>
                        <DeleteIcon />
                    </Tooltip>
                </IconButton>
            </div>

            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.header}>
                        <TableRow>
                            <TableCell> Runned Name </TableCell>
                            <TableCell align="right">Score</TableCell>
                            <TableCell align="right">Robot Moves</TableCell>
                            <TableCell align="right">Trash Collected</TableCell>
                            <TableCell align="right">Grid Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.results.map((row, i) => {
                            if (
                                selectName === row.gameName ||
                                selectName === "all"
                            ) {
                                return (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {row.gameName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.fail ? "fail" : getScore(row.moves, row.trashsCollected)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.moves}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.trashsCollected}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.gridSize}
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                        {state.results.length > 0 && (
                            <TableRow className={classes.median}>
                                <TableCell colSpan={1}>Median: </TableCell>
                                <TableCell align="right">
                                    {median.score}
                                </TableCell>
                                <TableCell align="right">
                                    {median.moves}
                                </TableCell>
                                <TableCell align="right">
                                    {median.trash}
                                </TableCell>
                                <TableCell align="right">
                                    {median.gridSize}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}
