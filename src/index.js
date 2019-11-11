import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import Game from './components/game'
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
