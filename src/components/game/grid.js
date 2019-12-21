import React from "react";
import Robot from "./robot";
import Controller from "./controller";
import GridArray from "./grid_array";
import Container from "@material-ui/core/Container";

export default function Grid() {
    return (
            <Container className="container" maxWidth="sm" justify="center">
            <Controller />
            <div style={{ style: "flex" }}>
                <GridArray />
            </div>
            <Robot />
            </Container>
    );
}
