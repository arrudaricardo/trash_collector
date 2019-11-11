import React from "react";

export default ({ gridState }) => (
    <div style={{ marginTop: "1em" }}>
        {" "}
        Robot Sensor:
        {gridState.up === "trash" && <div>⬆️ '🗑️'</div>}
        {gridState.down === "trash" && <div>⬇️️️️️️ '🗑️'</div>}
        {gridState.left === "trash" && <div>⬅ '🗑️'</div>}
        {gridState.right === "trash" && <div>➡️ '🗑️'</div>}
        {gridState.current === "trash" && <div>🔲️ '🗑️' </div>}
    </div>
);
