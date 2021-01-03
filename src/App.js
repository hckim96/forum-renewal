import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Header} from "./components/Header"
import {Card} from "./components/Card"
import {FireworkCanvas} from "./routes/FireworkCanvas";
import { Home } from './routes/Home';
import { Write } from './routes/Write';
export default function App() {
  

  
  return (
    <Router>
      <div style = {{backgroundColor: "white"}}>
          <Header/>
      </div>
      <Route
        exact
        path='/'
        render={() => <Home/>}
      />
      <Route
        path='/canvas'
        render={() => <FireworkCanvas/>}
      />
      <Route
        path='/write'
        render={() => <Write/>}
      />

    </Router>
  );
}
