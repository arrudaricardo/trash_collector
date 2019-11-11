import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing(1, 2),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink to='/'>
           Game 
          </NavLink>

          <NavLink to='/state'>
           Posibilities 
          </NavLink>

          <NavLink to='/results'>
           Results 
          </NavLink>

          
        </Breadcrumbs>
      </Paper>
      <br />
    </div>
  );
}
