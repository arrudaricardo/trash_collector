import React from 'react';
import Button from '@material-ui/core/Button';

export default ({setGridSize, setChangeOfTrash, setNumberOfRuns, gridSize, chanceOfTrash}) => {

    function handleGridChange(event) {
        setGridSize(event.target.value);
    }
    function handleChanceChange(event) {
        setChangeOfTrash(event.target.value);
    }

    function handleRestart(event) {
        event.preventDefault();
        setNumberOfRuns((prev) => prev + 1);
    }

return (
    <div className="grid-input">
        <div className="grid-size-input">
            Grid Size:
            <input
                type="number"
                min="1"
                onChange={handleGridChange}
                value={gridSize}
            />
        </div>
        <div className="grid-change-input">
            Trash:
            <input
                type="number"
                min="0"
                max="100"
                step="5"
                onChange={handleChanceChange}
                value={chanceOfTrash}
            />
            %
        </div>
        <div>
            <Button variant="contained" color="primary" onClick={handleRestart}>
                {" "}
                Reset{" "}
            </Button>
        </div>
    </div>
);

}
