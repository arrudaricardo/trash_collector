import React from "react";
import Robot from "./robot";
import Controller from "./controller";
import GridArray from "./grid_array";

export default function Grid() {
    return (
        <>
            <Controller />
            <div style={{ style: "flex" }}>
                <GridArray />
            </div>
            <Robot />
        </>
    );
}
