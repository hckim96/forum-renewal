import React, { useState } from 'react'
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./Write.css"

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

const sampleBody = String.raw`**Hello world!!!**
# 제목1
1. 1번
2. 2번
3. 3번
## 제목2
- 하나
- 둘
- 셋
${"```"}c++
std::cout << "this is code";
${"```"}
`;

export const Write = ({onPostWrite}) => {
    const [title, setTitle] = useState("");
    // const [value, setValue] = useState("**Hello world!!!**\n# abcd");
    const [value, setValue] = useState(sampleBody);
    const [selectedTab, setSelectedTab] = useState("write");

    return (
        <div className = "write-container">
            {/* <form onSubmit = {() => {console.log("value = "); console.log(value);console.log("title = "); console.log(title);}}> */}
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
                    Promise.resolve(converter.makeHtml(markdown))
                    }
                />

                <button onClick = {() => {
                    onPostWrite({title: title, body: value});
                }} style = {{width: "50px", alignSelf: "flex-end"}}>등록</button>
            {/* </form> */}
        </div>
    )
}
