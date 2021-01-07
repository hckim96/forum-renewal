import React, { useState } from 'react'
import ReactMde from "react-mde";
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {xonokai} from 'react-syntax-highlighter/dist/esm/styles/prism' // 1

import "react-mde/lib/styles/css/react-mde-all.css";
import "./Write.css"
import { useHistory } from 'react-router-dom';

const sampleBody = String.raw`**Hello world!!!**
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

`;

const renderers = {
    code: ({language, value}) => {
      return <SyntaxHighlighter style={xonokai} language= {language} children={value}/>
    }
}

export const Write = ({onPostWrite, onPostUpdate, post}) => {

    let post2 = post ? post : {"title" : "", "body" : sampleBody};
    const [title, setTitle] = useState(post2.title);
    const [value, setValue] = useState(post2.body);
    
    const [selectedTab, setSelectedTab] = useState("write");

    const history = useHistory();
    return (
        <div>
            {post ?
            (<div className = "write-container">
                    <input
                            placeholder = "제목을 입력하세요..." 
                            className = "write-title" 
                            type="text" value={title} 
                            onChange={e => setTitle(e.target.value)}
                            />
                    <ReactMde
                        className = "write-mde"
                        value={value}
                        onChange={setValue}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        minEditorHeight = {400}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(<ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>)
                        }
                        />

                    <button className = "write-button"
                    onClick = {() => {
                        onPostUpdate({...post2 ,title: title, body: value, id: post2.id});
                        alert("수정되었습니다.")
                        history.push(`/post/${post2.id}`);
                    }} >수정</button>
            </div>)
            :
            (<div className = "write-container">
                    <input autoFocus = {true} 
                            placeholder = "제목을 입력하세요..." 
                            className = "write-title" 
                            type="text" value={title} 
                            onChange={e => setTitle(e.target.value)}
                    />
                    <ReactMde
                        className = "write-mde"
                        value={value}
                        onChange={setValue}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        minEditorHeight = {400}
                        generateMarkdownPreview={markdown =>
                        Promise.resolve(<ReactMarkdown renderers={renderers}>{markdown}</ReactMarkdown>)
                        }
                    />

                    <button className = "write-button"
                    onClick = {() => {
                        onPostWrite({title: title, body: value, createdAt: Date.now()});
                    }} >등록</button>
            </div>)
            }
        </div>
    )
}
