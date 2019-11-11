import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Pcontext} from './game'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    // minWidth: 650,
  },
});


export default function Results() {
  const {state} = useContext(Pcontext)

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Run Name </TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Robot Moves</TableCell>
            <TableCell align="right">Trash Collected</TableCell>
            <TableCell align="right">Grid Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.results.map(row => (
            <TableRow key={row.gameName}>
              <TableCell component="th" scope="row">
                {row.gameName}
              </TableCell>
              <TableCell align="right">{row.fail ? "fail": row.score}</TableCell>
              <TableCell align="right">{row.moves}</TableCell>
              <TableCell align="right">{row.trashsCollected}</TableCell>
              <TableCell align="right">{row.gridSize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
