import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Grid from './components/grid'

function App() {

  return (<Grid></Grid>)
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
