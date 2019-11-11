import React,{useContext} from 'react';
import Box from './box'
import { Pcontext } from "./game";

export default () => {
    const {state } = useContext(Pcontext)

     let grid = state.grid.gridArray.map((row, idx) => {
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

        return <div id={idx} className="gridRow"> {rows} </div>;
    });

    return <div className="gridContainer"> {grid} </div>
     
}