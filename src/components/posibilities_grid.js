import React, { useState, useEffect } from "react";
import Box from "./box";
// TODO: display trash with robot in current location; render all posibilities
export default () => {
    const [state, setState] = useState({
        up: "empty",
        down: "empty",
        left: "empty",
        right: "empty",
        current: "empty"
    });

    function toggleState(event, state, position, isRobot = false) {
        event.preventDefault()
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

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div id="left">
                    <Box visible={false} hasTrash={false} />
                    <div onClick={(e) => setState(toggleState(e, state, "left"))}>
                        <Box
                            visible={state.left === "wall" ? false : true}
                            hasTrash={state.left === "trash" ? true : false}
                        />
                    </div>
                </div>
                <div>
                    <div
                        id="up"
                        onClick={(e) => setState(toggleState(e, state, "up"))}
                    >
                        <Box
                            visible={state.up === "wall" ? false : true}
                            hasTrash={state.up === "trash" ? true : false}
                        />
                    </div>

                    <div
                    id='current'
                        onClick={(e) => setState(toggleState(e, state, "current", true))}
                    >
                        <Box
                            hasRobot={true}
                            hasTrash={state.current === "trash" ? true : false}
                        />
                    </div>

                    <div
                        id="down"
                        onClick={(e) => setState(toggleState(e, state, "down"))}
                    >
                        <Box
                            visible={state.down === "wall" ? false : true}
                            hasTrash={state.down === "trash" ? true : false}
                        />
                    </div>
                </div>
                <div id="right">
                    <Box visible={false} hasTrash={false} />

                    <div onClick={(e) => setState(toggleState(e, state, "right"))}>
                        <Box
                            visible={state.right === "wall" ? false : true}
                            hasTrash={state.right === "trash" ? true : false}
                        />
                    </div>
                </div>
            </div>
            <input />
        </div>
    );
};
