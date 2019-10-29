import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Route } from "react-router-dom";
import Grid from "./grid";
import PosGrid from "./posibilities_grid";
import NavBar from './nav_bar'

export default () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <NavBar/>
            <Container maxWidth="sm">
                <Route exact path="/">
                    <Grid />
                </Route>
                <Route path="/state">
                    <PosGrid />
                </Route>
            </Container>
        </React.Fragment>
    );
};
