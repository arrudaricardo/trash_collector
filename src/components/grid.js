import React from "react";
import Robot from "./robot.js";
import Controller from "./controller";
import GridArray from "./grid_array";

export default function Grid() {



    return (
        <>
            <Controller />
            <GridArray/>
            <Robot />
        </>
    );
}
