import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from './display_run'
import Result from './selection_results'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  placeholder: {

    justifyContent: 'center',
    display: 'flex',
    padding: '0.3em',
    flexWrap: 'wrap'
  },
}));

export default function Display({running:loading, gridArray, robots, displayGrid}) {

  const classes = useStyles();

  return (
    <div className={classes.root}>

        {(gridArray !== null) &&
            <div className={classes.placeholder}>
              {displayGrid &&  <Grid gridArray={gridArray[0]} /> }

              { !loading && 
                <Result robots={robots} gridArray={gridArray} />
              }

             </div> 
        }
      </div>
  );
}