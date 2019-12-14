import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Pcontext } from "./game";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

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
        minWidth: 12
    },
    delete: {
        margin: theme.spacing(1)
    },
    inputs: {
        display: "flex"
    }
}));

export default function Results(robots) {
  console.log(Object.values(robots))

    const classes = useStyles();


    return (
        <div>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.header}>
                        <TableRow>
                            <TableCell align="right">Run Score</TableCell>
                            <TableCell align="right">Average Score</TableCell>
                            <TableCell align="right">Moves</TableCell>
                            <TableCell align="right">Trash Collected</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(robots).map( (robot,i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell align="center">
                                          {Math.round(robot.currRun.score)}
                                        </TableCell>
                                        <TableCell align="center">
                                          {Math.round(robot.metadata.averageScore)}
                                        </TableCell>
                                        <TableCell align="center">
                                          {robot.currRun.moves}
                                        </TableCell>
                                        <TableCell align="center">
                                          {robot.currRun.trashColleted}
                                        </TableCell>
                                    </TableRow>
                                );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}
