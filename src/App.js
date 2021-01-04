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


export default function App() {
  const history = useHistory();
  // const [postList, setPostList] = useState(
  //   [...Array(3).keys()].map((n) => {
  //     return {title: "sample title" + n, body: "sample body" + n};
  //   })
  // )
  const [postList, setPostList] = useState(
    [{title: "SampleTitle",
    body: String.raw`**Hello world!!!**
# 제목1
1. 1번
2. 2번
3. 3번
## 제목2
- 하나
- 둘
- 셋
${"```"}cpp
#include <iostream>
using namespace std;
int main() {
  cout << "hello, world\n";
}
${"```"}

*Italic*
> Blockquote

`,
createdAt: Date.now()
  }]
  )
  const onPostWrite = (p) => {
    setPostList([...postList, p]);
    history.push("/post");
  }
  return (
    <div>
      <Header/>
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
        render={() => <PostList postList = {[].concat(postList).reverse()}/>}
        />
    </div>
  );
}
