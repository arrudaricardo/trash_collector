import React from 'react';
import Box from './selection_box'

export default ({gridArray}) => {

     let grid = gridArray.map((row, idx) => {
        const rows = row.map((e, idx2) => {
            return (

                <Box
                    key={Number(`${idx}${idx2}`)}
                    id={e[0]}
                    hasRobot={e[2]}
                    hasTrash={e[1]}
                    passedPos={e[3]}
                />
            );
        });

        return <div key={idx} className="gridRow"> {rows} </div>;
    });

    return <div className="gridContainer"> {grid} </div>
     
}
