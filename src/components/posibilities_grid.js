import React, { useState, useContext, useEffect } from "react";
import Box from "./box";
import Pbutton from "./posibilities_button";
import { Pcontext } from "./game";
import { stateValues } from "./util";
import Pstate from "./pstate";


const Pgrid  = () => {
    const { state } = useContext(Pcontext);

    const [action, setAction] = useState("");
    const [stateSum, setStateSum] = useState(835791);

    const [gridState, setState] = useState({
        up: "empty",
        down: "empty",
        left: "empty",
        right: "empty",
        current: "empty"
    });

    
    const getStateSum = () => {
        let stateSum = 1;
        Object.keys(gridState).forEach(dir => {
            stateSum *= stateValues[dir][gridState[dir]];
        });
        return stateSum;
    };


    // update action for the state sum
    // update grid sum 
    useEffect(() => {
        setStateSum(getStateSum());
        setAction(state.moves[state.grid.gameName][stateSum]);
    },[Object.keys(gridState)] );


    function toggleState(event, position, isRobot = false) {
        event.preventDefault();
        let dir = gridState[position];
        // return next gridState
        let states;
        if (!isRobot) {
            states = ["empty", "wall", "trash"];
        } else {
            states = ["empty", "trash"];
        }
        let idx = states.indexOf(dir);
        let nextDir = states[(idx + 1) % states.length];
        let newState = { ...gridState, [position]: nextDir };
        return newState;
    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div id="left">
                    <Box visible={false} hasTrash={false} />
                    <div onClick={e => setState(toggleState(e, "left"))}>
                        <Box
                            visible={gridState.left === "wall" ? false : true}
                            hasTrash={gridState.left === "trash" ? true : false}
                        />
                    </div>
                </div>
                <div>
                    <div id="up" onClick={e => setState(toggleState(e, "up"))}>
                        <Box
                            visible={gridState.up === "wall" ? false : true}
                            hasTrash={gridState.up === "trash" ? true : false}
                        />
                    </div>

                    <div
                        id="current"
                        onClick={e => setState(toggleState(e, "current", true))}
                    >
                        <Box
                            hasRobot={true}
                            hasTrash={
                                gridState.current === "trash" ? true : false
                            }
                        />
                    </div>

                    <div
                        id="down"
                        onClick={e => setState(toggleState(e, "down"))}
                    >
                        <Box
                            visible={gridState.down === "wall" ? false : true}
                            hasTrash={gridState.down === "trash" ? true : false}
                        />
                    </div>
                </div>
                <div id="right">
                    <Box visible={false} hasTrash={false} />

                    <div onClick={e => setState(toggleState(e, "right"))}>
                        <Box
                            visible={gridState.right === "wall" ? false : true}
                            hasTrash={
                                gridState.right === "trash" ? true : false
                            }
                        />
                    </div>
                </div>
            </div>
            <Pbutton
                gridState={gridState}
                action={action}
                stateSum={stateSum}
            />
            <div />

            <div style={{ padding: "1em", maxHeight: "10px" }}>
                {/* <Pstate gridState={gridState}/> */}
            </div>
        </div>
    );
};

export default Pgrid;