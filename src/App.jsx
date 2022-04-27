import React from "react";
import MdDemo from "./component/mdDemo";
import SLGDemo from "./component/SLGDemo";
// import { BrowserRouter, Route } from "react-router-dom";
const App = () => {
  console.log('####    origin: https://github.com/wufang95/wufang95.github.io    ####')
  return <div style={{whiteSpace: 'pre-line'}}>
    {'CUSTOM WEBSET DEMO\nFIRST CHANGE'}
    {/* <MdDemo /> */}
    <SLGDemo />
  </div>;
};

export default App;