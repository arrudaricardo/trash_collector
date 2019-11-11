import React from 'react';
import Box from './box'

export default ({gridArray}) => {

     let grid = gridArray.map((row, idx) => {
        const rows = row.map((e, idx2) => {
            return (
                <Box
                    key={Number(`${idx}${idx2}`)}
                    id={e[0]}
                    hasRobot={e[2]}
                    hasTrash={e[1]}
                />
            );
        });

        return <div className="gridRow"> {rows} </div>;
    });

    return <div className="gridContainer"> {grid} </div>
     
}