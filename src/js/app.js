import React from "react";
import ReactDOM from "react-dom";
import List from "./components/List";
require('./helpers/sticky');

ReactDOM.render(<List />, document.getElementById("app"));