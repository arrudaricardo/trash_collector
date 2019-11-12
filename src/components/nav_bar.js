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

const selected = {
color: 'rgb(196, 96, 29',
}

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs  aria-label="breadcrumb">
          <NavLink  exact activeStyle={selected} to='/'>
           Game 
          </NavLink>

          <NavLink activeStyle={selected} to='/state'>
          Possibilities
          </NavLink>

          <NavLink activeStyle={selected} to='/results'>
           Results 
          </NavLink>

          
        </Breadcrumbs>
      </Paper>
      <br />
    </div>
  );
}
