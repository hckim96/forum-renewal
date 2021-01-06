import React from 'react'
import "./PostPreview.css";
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {xonokai} from 'react-syntax-highlighter/dist/esm/styles/prism' // 1
import { useHistory } from 'react-router-dom';
// import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
// import {coy} from 'react-syntax-highlighter/dist/esm/styles/prism'
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
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
    const history = useHistory();

    return (
        <div className = "postPreview" onClick = {() => {history.push(`/post/${post.id}`)}}>
            <h1 className = "postPreview-title">{post.title}</h1>
            <div className = "postPreview-info-container">
                <small>{post.id}</small>
                <small>&nbsp;&nbsp;&nbsp;</small>
                <small>{formatDate(post.createdAt)}</small> 
            </div>
            <div className = "postPreview-body">
                <ReactMarkdown renderers={renderers}>{post.body}</ReactMarkdown>
            </div>
        </div>
    )
}
