import React from 'react'
import "./PostPreview.css";
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {xonokai} from 'react-syntax-highlighter/dist/esm/styles/prism' // 1
// import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
// import {coy} from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minute = d.getMinutes(),
        second = d.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hour.length < 2) 
        hour = '0' + hour;
    if (minute.length < 2) 
        minute = '0' + minute;
    if (second.length < 2) 
        second = '0' + second;

    return `${month}-${day} ${hour}:${minute}:${second}`;
}

const renderers = {
    code: ({language, value}) => {
      return <SyntaxHighlighter style={xonokai} language= {language} children={value} />
    }
}

export const PostPreview = ({post}) => {
    return (
        <div className = "postPreview">
            <h1 className = "postPreview-title">{post.title}</h1>
            <div>
                <span>{formatDate(post.createdAt)}</span> 
            </div>
            <div className = "postPreview-body">
                <ReactMarkdown renderers={renderers}>{post.body}</ReactMarkdown>
            </div>
        </div>
    )
}
