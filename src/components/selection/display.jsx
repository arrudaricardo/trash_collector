import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from './display_run'
import Result from './selection_results'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  placeholder: {
    height: 40,
  },
}));

export default function Display({running:loading, gridArray, robots, displayGrid}) {

  const classes = useStyles();

  return (
    <div className={classes.root}>

        {(gridArray !== null) &&
            <div style={{ display: 'flex', padding: '0.1em' }} >
              {displayGrid &&  <Grid gridArray={gridArray[0]} /> }

              { !loading && 
                <Result robots={robots} gridArray={gridArray} />
              }

             </div> 
        }
      </div>
  );
}