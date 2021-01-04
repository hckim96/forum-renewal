import React, { useState } from 'react'
import ReactMde from "react-mde";
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {xonokai} from 'react-syntax-highlighter/dist/esm/styles/prism' // 1

import "react-mde/lib/styles/css/react-mde-all.css";
import "./Write.css"

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
      return <SyntaxHighlighter style={xonokai} language= {language} children={value} />
    }
}

export const Write = ({onPostWrite}) => {
    const [title, setTitle] = useState("");
    // const [value, setValue] = useState("**Hello world!!!**\n# abcd");
    const [value, setValue] = useState(sampleBody);
    const [selectedTab, setSelectedTab] = useState("write");

    return (
        <div className = "write-container">
                <input autoFocus = "true" 
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

                <button onClick = {() => {
                    onPostWrite({title: title, body: value, createdAt: Date.now()});
                }} style = {{width: "50px", alignSelf: "flex-end"}}>등록</button>
        </div>
    )
}
