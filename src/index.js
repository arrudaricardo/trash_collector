import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './components/game'
import PosGrid from './components/posibilities_grid'

import "./styles.css";

function App() {

  return (
    <BrowserRouter>
      <Game />
 
    </BrowserRouter>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
