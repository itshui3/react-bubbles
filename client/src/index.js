// React
import React, { useState } from "react";
import ReactDOM from "react-dom";
// App
import App from "./App";
// Router
import { BrowserRouter as Router } from 'react-router-dom'

const rootElement = document.getElementById("root");
ReactDOM.render(
<Router>
<App />
</Router>
, rootElement);
