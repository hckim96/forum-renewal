import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import {Header} from "./components/Header"
import {FireworkCanvas} from "./routes/FireworkCanvas";
import { Home } from './routes/Home';
import { Write } from './routes/Write';
import { PostList } from './routes/PostList';
import { useState } from 'react';
import { useHistory } from "react-router-dom";


export default function App(props) {
  const history = useHistory();
  const [postList, setPostList] = useState(
    [...Array(3).keys()].map((n) => {
      return {title: "sample title" + n, body: "sample body" + n};
    })
  )
  const onPostWrite = (p) => {
    setPostList([...postList, p]);
    history.push("/post");
  }
  return (
    <div>

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
        render={() => <Write onPostWrite = {onPostWrite}/>}
        />
      <Route
        path='/post'
        render={() => <PostList postList = {postList}/>}
        />
    </div>
  );
}
