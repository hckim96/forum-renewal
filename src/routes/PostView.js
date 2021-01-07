import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useHistory } from 'react-router-dom';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {xonokai} from 'react-syntax-highlighter/dist/esm/styles/prism' // 1
import "./PostView.css";

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        hour = '' + d.getHours(),
        minute = '' + d.getMinutes(),
        second = '' + d.getSeconds();

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

export const PostView = ({post, onPostDelete}) => {

    const history = useHistory();

    return (
        <div className = "postView-container">
            <h1 className = "postView-title">{post.title}</h1>
            <div className = "postView-info-container">
                <div>
                    <small>{post.id}</small>
                    <small>&nbsp;&nbsp;&nbsp;</small>
                    <small>{formatDate(post.createdAt)}</small> 
                </div>
                <div style = {{justifySelf: "flex-end"}}>
                    <span onClick = {() => {history.push(`/write?id=${post.id}`)}} style = {{cursor: "pointer"}}>수정</span>
                    <small>&nbsp;&nbsp;&nbsp;</small>
                    <span onClick = {() => {onPostDelete(post); alert("삭제되었습니다.")}} style = {{cursor: "pointer"}}>삭제</span>
                </div>
            </div>
            <div className = "postView-body">
                <ReactMarkdown renderers={renderers}>{post.body}</ReactMarkdown>
            </div>
        </div>
    )
}