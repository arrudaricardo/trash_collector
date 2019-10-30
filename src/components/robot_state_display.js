import React from "react";

export default ({ gridState }) => (
    <div style={{ marginTop: "1em" }}>
        {" "}
        Robot Sensor:
        {gridState.up === "TRASH" && <div>⬆️ '🗑️'</div>}
        {gridState.down === "TRASH" && <div>⬇️️️️️️ '🗑️'</div>}
        {gridState.left === "TRASH" && <div>⬅ '🗑️'</div>}
        {gridState.right === "TRASH" && <div>➡️ '🗑️'</div>}
        {gridState.current === "TRASH" && <div>🔲️ '🗑️' </div>}
    </div>
);
