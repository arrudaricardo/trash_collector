import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { Pcontext } from "../game";
import TableContainer from '@material-ui/core/TableContainer';
import Snakbar from '../snakbar'


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    maxHeight: 440,
  },
  header: {
    fontSize: '0.7em',
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
  },
  button: {
    display: "flex"
  },
  container: {
    // maxHeight: 400
  }
}));

export default function Results({ robots, gridArray }) {

  const [message, setMessage] = useState(null)
  const [variant, setVariant] = useState(null)
  const [open, setOpen] = useState(false);
  const { _, dispatch } = useContext(Pcontext);
  const classes = useStyles();

  const addRobotPossibilities = (event, robot) => {

    //gamename: {statesum: action}
    let result = {}
    Object.values(robot.possibilites).forEach(pos => {
      result[pos.stateSum] = pos.action
    })
    event.preventDefault()
    dispatch({
      type: "loadRobotPossibilities",
      name: 'Robot',
      value: result
    });
  }


  return (
    <div>
      <Paper className={classes.root}>
        <Snakbar variant={variant} message={message} horizontal='center' vertical='bottom' setOpen={setOpen} open={open} />
        <TableContainer style={{ maxHeight: `${gridArray[0].length * 80}px` }} className={classes.container}>
          <Table size='small' className={classes.table} aria-label="simple table">
            <TableHead className={classes.header}>
              <TableRow>
                <TableCell align="right">Run Score</TableCell>
                <TableCell align="right">Average Score</TableCell>
                <TableCell align="right">Moves</TableCell>
                <TableCell align="right">Trash Collected</TableCell>
                <TableCell size='small' align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(robots).sort((a, b) => b.currRun.score - a.currRun.score).map((robot, i) => {
                return (
                  <TableRow tabIndex={-1} key={i}>
                    <TableCell align='center' scope="row" padding="none">
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
                    <TableCell align='left' padding='none'>
                      <Tooltip title='load robot' placement='right'>
                        <IconButton size='small' color="primary" component="span">
                          <AddIcon onClick={(e) => {
                            addRobotPossibilities(e, robot);
                            setMessage("Robot Added to Game/Build");
                            setVariant('success')
                            setOpen(true)
                          }
                          } fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
