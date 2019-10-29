import React from "react";
import Box from "./box";
// TODO: display trash with robot in current location; render all posibilities
const Posibility = ({ state }) => (
    <div>
        <div style={{ display: "flex" }}>
            <div id="left">
                <Box visible={false} hasTrash={false} />
                <Box
                    visible={state.left === "wall" ? false : true}
                    hasTrash={state.left === "trash" ? true : false}
                />
            </div>
            <div>
                <div id="up">
                    <Box
                        visible={state.up === "wall" ? false : true}
                        hasTrash={state.up === "trash" ? true : false}
                    />
                </div>

                <div>
                    <Box
                        hasRobot={true}
                        hasTrash={state.current === "trash" ? true : false}
                    />
                </div>

                <div id="down">
                    <Box
                        visible={state.down === "wall" ? false : true}
                        hasTrash={state.down === "trash" ? true : false}
                    />
                </div>
            </div>
            <div id="right">
                <Box visible={false} hasTrash={false} />
                <Box
                    visible={state.right === "wall" ? false : true}
                    hasTrash={state.right === "trash" ? true : false}
                />
            </div>
        </div>
        <input />
    </div>
);

export default () => {
    // return <Posibility state={{up:'empty',down:'empty',left:'trash',right:'empty',current:'empty'}}/>;
    return (
        <>
            <Posibility
                state={{
                    up: "empty",
                    down: "empty",
                    left: "trash",
                    right: "empty",
                    current: "empty"
                }}
            />
            <Posibility
                state={{
                    up: "wall",
                    down: "trash",
                    left: "empty",
                    right: "empty",
                    current: "empty"
                }}
            />
        </>
    );
};
