import React from "react";

import trashImg from "../static/img/trash.png";
import robotImg from "../static/img/robot.png";

export default function Box({
    id,
    hasRobot = false,
    hasTrash,
    visible = true
}) {
    return (
        <div
            key={`${id}`}
            style={{ visibility: `${visible ? "visible" : "hidden"}` }}
            id={`${id}`}
            className={`gridBox 
            ${
                hasTrash && hasRobot
                    ? "trashRobot"
                    : hasRobot
                    ? "robot"
                    : hasTrash
                    ? "trash"
                    : ""
            }
            `}
        >
            {hasRobot && <img id="robotImg" src={robotImg} alt="" />}
            {hasTrash && <img id="trashImg" src={trashImg} alt="" />}
            <div className="position-id">{id && `${id[0]}-${id[1]}`}</div>
        </div>
    );
}
