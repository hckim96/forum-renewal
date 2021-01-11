import './App.css';
import {
  Route, useLocation,
} from "react-router-dom";

import {Header} from "./components/Header"
import {FireworkCanvas} from "./routes/FireworkCanvas";
import { Home } from './routes/Home';
import { Write } from './routes/Write';
import { PostList } from './routes/PostList';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { PostView } from './routes/PostView';

export default function App() {
  const history = useHistory();
  
  const [postList, setPostList] = useState(
    [{id: 0,
      title: "SampleTitle",
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
    if (postList.length !== 0) {
      p.id = postList[postList.length - 1].id + 1;
    } else {
      p.id = 0;
    }
    setPostList([...postList, p]);
    history.push("/post");
  }

  const onPostUpdate = (p) => {
    const newPostList = postList.map((post) => {
      if (post.id === p.id) {
        return {...post, title: p.title, body: p.body};
      } else {
        return post;
      }
    })

    setPostList(newPostList);
  }

  const onPostDelete = (p) => {
    setPostList(postList.filter(post => post.id !== p.id));
    history.push("/post");
  }

  const findPostIdx = (id) => {
    for (let idx in postList) {
      if (postList[idx].id === id) {
        return idx;
      }
    }
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

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
        render = {() => {
          let id = query.get("id");
          if (id) {
            return <Write post = {postList[findPostIdx(Number(id))]} onPostUpdate = {onPostUpdate}/>
          } else {
            return <Write onPostWrite = {onPostWrite}/>
          }
        }}
        />
      <Route
        exact
        path='/post'
        render={() => <PostList postList = {[].concat(postList).reverse()}/>}
        />
      <Route
        path='/post/:id'
        render={({ match }) => (
            <PostView
                post = {postList[findPostIdx(Number(match.params.id))]}
                onPostDelete = {onPostDelete}
            />
        )}
        />
    </div>
  );
}
