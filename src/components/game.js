import React, {createContext, useReducer, useEffect} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Route } from "react-router-dom";
import Grid from "./grid";
import PosGrid from "./posibilities_grid";
import NavBar from './nav_bar'
import reducer from './reducer';
import Results from './results'

export const Pcontext = createContext(null)

const initialState = {
    moves: {default: {}},
    results: [],
    gameName: 'default' 
}


export default () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    useEffect(()=>{
        console.log( state )
    },[state])

    return (
        <>
            <CssBaseline />
            <NavBar/>
            <Container  maxWidth="sm" justify='center'>
                <Pcontext.Provider value={ {state, dispatch} }> 

                <Route exact path="/">
                    <Grid/>
                </Route>

                <Route path="/state">
                    <PosGrid />
                </Route>

                <Route path="/results">
                    <Results />
                </Route>

            </Pcontext.Provider>
            </Container>
        </>
    );
};
