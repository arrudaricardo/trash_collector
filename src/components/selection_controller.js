import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    button: {
        marginBottom: '0.5em',
    },
}));

export default ({runGame, sampleSize, setSampleSize, selectionPercetage, setSelectionPercetage, iteration, setIteration, gridSize, setGridSize, trashChange, setTrashChange, movesMultiplier, setMovesMultiplier, trashCollectedMultiplier, setTrashCollectedMultiplier }) => {

    const classes = useStyles();

    function handleRun(event) {
        event.preventDefault();
        runGame();
    }

    return (
        <div style={{display:"flex"}}className="grid-input">

            <Tooltip title={`size: ${gridSize}x${gridSize}`} placement="top">
                <div className="grid-size-input">
                    Grid Size:
            <input
                        type="number"
                        min="1"
                        onChange={(e) => setGridSize(e.target.value)}
                        value={gridSize}
                    />
                </div>
            </Tooltip>

            <Tooltip title="chance per slot" placement="top">
                <div className="grid-change-input">
                    Trash Chance:
            <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        onChange={(e) => setTrashChange(e.target.value)}
                        value={trashChange}
                    />
                    %
        </div>
            </Tooltip>

            <Tooltip title="selection percentage" placement="top">
                <div className="grid-change-input">
                    Selection %:
            <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        onChange={(e) => setSelectionPercetage(e.target.value)}
                        value={selectionPercetage}
                    />
                    %
        </div>
            </Tooltip>

            <Tooltip title="number of iteration" placement="top">
                <div className="grid-change-input">
                    Num. Iteration:
            <input
                        type="number"
                        min="0"
                        max="10000"
                        step="5"
                        onChange={(e) => setIteration(e.target.value)}
                        value={iteration}
                    />
                    %
        </div>
            </Tooltip>

            <Tooltip title="sample size" placement="top">
                <div className="grid-change-input">
                    Sample Size:
            <input
                        type="number"
                        min="0"
                        max="10000"
                        step="10"
                        onChange={(e) => setSampleSize(e.target.value)}
                        value={sampleSize}
                    />
                    %
        </div>
            </Tooltip>

            <Tooltip title="Multiplier for moves score" placement="top">
                <div className="grid-change-input">
                    Moves Multiplier:
            <input
                        type="number"
                        step="1"
                        onChange={(e) => setMovesMultiplier(e.target.value)}
                        value={movesMultiplier}
                    />
                    
        </div>
            </Tooltip>

            <Tooltip title="Multiplier for Trash Collected" placement="top">
                <div className="grid-change-input">
                Trash Multiplier:
            <input
                        type="number"
                        step="1"
                        onChange={(e) => setTrashCollectedMultiplier(e.target.value)}
                        value={trashCollectedMultiplier}
                    />
            </div>
            </Tooltip>

            <div>
                <Tooltip title="Run Sample" placement="top">
                    <Button className={classes.button} variant="contained" color="primary" onClick={handleRun}>
                        {" "}
                        Run{" "}
                    </Button>
                </Tooltip>
            </div>
        </div>
    );

}
