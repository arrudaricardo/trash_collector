import React from "react";

import trashImg from "../../static/img/trash.png";
import robotImg from "../../static/img/santarobot.png"
import robotSanta from "../../static/img/santarobot.png"

let robotSrc = new Date().getMonth() === 11? robotSanta: robotImg 


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
            {hasRobot && <img id="robotImg" src={robotSrc} alt="" />}
            {hasTrash && <img id="trashImg" src={trashImg} alt="" />}
            <div className="position-id">{id && `${id[0]}-${id[1]}`}</div>
        </div>
    );
}
