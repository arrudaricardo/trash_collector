import React, { createContext, useReducer, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Route } from "react-router-dom";
import Grid from "./grid";
import PosGrid from "./posibilities_grid";
import NavBar from "./nav_bar";
import reducer from "./reducer";
import Results from "./results";
import { generateGridArray } from "./util";
import Selection from "./selection";

export const Pcontext = createContext(null);

const gridSize = 5;
const chanceOfTrash = 30;
const [gridArray, robotPos] = generateGridArray(gridSize, chanceOfTrash);
const initialState = {
    moves: { default: {} },
    results: [],
    grid: {
        speed: 500,
        gameName: "default",
        gridArray,
        robotPos,
        gridSize,
        chanceOfTrash,
        runs: 0,
        gameOver: false,
        moves: 0,
        trashColleted: 0
    }
};

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // logger
    // useEffect(() => {
    // console.log(state);
    // });

    return (
        <>
            <CssBaseline />
            <NavBar />
            <Container className="container" maxWidth="sm" justify="center">
                <Pcontext.Provider value={{ state, dispatch }}>
                    <Route exact path="/">
                        <Grid />
                    </Route>
                    <Route path="/state">
                        <PosGrid />
                    </Route>
                    <Route path="/results">
                        <Results />
                    </Route>

                    <Route path="/selection">
                        <Selection />
                    </Route>
                </Pcontext.Provider>
            </Container>
        </>
    );
};
