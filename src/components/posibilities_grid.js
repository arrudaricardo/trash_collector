import React, { useState, useContext, useEffect } from "react";
import Box from "./box";
import Pbutton from "./posibilities_button";
import { Pcontext } from "./game";
import { stateValues } from "./util";
import Pstate from './pstate'

export default () => {
    const { pState } = useContext(Pcontext);

    const [action, setAction] = useState("");
    const [stateSum, setStateSum] = useState(835791);

    const [state, setState] = useState({
        up: "empty",
        down: "empty",
        left: "empty",
        right: "empty",
        current: "empty"
    });


    // ["up", "down", "left", "right", "current"].forEach(dir => {
    //     robotState[dir] = checkPos(dir);
    //     stateSum *= stateValues[dir][checkPos(dir)]
    // });
    const getStateSum = () => {
        let stateSum = 1;
        Object.keys(state).forEach(dir => {
            stateSum *= stateValues[dir][state[dir]];
        });
        return stateSum;
    };

    useEffect(()=>{
        setStateSum(getStateSum())
    },[state])

    useEffect(()=>{
        setAction(pState[stateSum]);
    },[stateSum])


    function toggleState(event, position, isRobot = false) {
        event.preventDefault();
        let dir = state[position];
        // return next state
        let states;
        if (!isRobot) {
            states = ["empty", "wall", "trash"];
        } else {
            states = ["empty", "trash"];
        }
        let idx = states.indexOf(dir);
        let nextDir = states[(idx + 1) % states.length];
        let newState = { ...state, [position]: nextDir };
        return newState;
    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div id="left">
                    <Box visible={false} hasTrash={false} />
                    <div onClick={e => setState(toggleState(e, 'left'))}>
                        <Box
                            visible={state.left === "wall" ? false : true}
                            hasTrash={state.left === "trash" ? true : false}
                        />
                    </div>
                </div>
                <div>
                    <div id="up" onClick={e =>setState(toggleState(e, 'up'))}>
                        <Box
                            visible={state.up === "wall" ? false : true}
                            hasTrash={state.up === "trash" ? true : false}
                        />
                    </div>

                    <div
                        id="current"
                        onClick={e =>setState(toggleState(e, 'current', true))}
                    >
                        <Box
                            hasRobot={true}
                            hasTrash={state.current === "trash" ? true : false}
                        />
                    </div>

                    <div id="down" onClick={e =>setState(toggleState(e, 'down' ))}>
                        <Box
                            visible={state.down === "wall" ? false : true}
                            hasTrash={state.down === "trash" ? true : false}
                        />
                    </div>
                </div>
                <div id="right">
                    <Box visible={false} hasTrash={false} />

                    <div onClick={e =>setState(toggleState(e, 'right' ))}>
                        <Box
                            visible={state.right === "wall" ? false : true}
                            hasTrash={state.right === "trash" ? true : false}
                        />
                    </div>
                </div>
            </div>
            <Pbutton state={state} action={action} stateSum={stateSum} />
            <div />

    <div style={{padding: "1em", maxHeight: "10px"}}>
                <Pstate  pState={pState}/>
    </div>

        </div>
    );
};
