import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Header} from "./components/Header"
import {Card} from "./components/Card"

export default function App() {
  let Cards =  [...Array(25).keys()].map((d) =>
      <Card number = {d}/>
  );


  return (
    <Router>
      <div>
        <div style = {{backgroundColor: "white"}}>
          <Header/>
        </div>
        <div  style = {{paddingTop: "20px", display: "flex", flexWrap: "wrap"}}>
          {Cards}
        </div>
      </div>
    </Router>
  );
}
