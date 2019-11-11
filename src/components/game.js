import React, {createContext, useReducer, useEffect} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Route } from "react-router-dom";
import Grid from "./grid";
import PosGrid from "./posibilities_grid";
import NavBar from './nav_bar'
import Preducer from './reducer';

export const Pcontext = createContext(null)

export default () => {
    const [pState, dispatch] = useReducer(Preducer, {})
    
    //debug
    useEffect(()=>{
        console.log({ pState })
    },[pState])

    return (
        <>
            <CssBaseline />
            <NavBar/>
            <Container  maxWidth="sm" justify='center'>
                <Pcontext.Provider value={ {pState, dispatch} }> 
                <Route exact path="/">
                    <Grid />
                </Route>
                <Route path="/state">
                    <PosGrid />
                </Route>
                </Pcontext.Provider>
            </Container>
        </>
    );
};
