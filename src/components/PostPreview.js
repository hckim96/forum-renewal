import React from 'react'
import Showdown from 'showdown'
import "./PostPreview.css";

export const PostPreview = ({post}) => {
    const converter = new Showdown.Converter();
    var parse = require('html-react-parser');
    return (
        <div className = "postPreview">
            <h1 className = "postPreview-title">{post.title}</h1>
            {/* <div dangerouslySetInnerHTML = {{__html: converter.makeHtml(post.body)}}></div> */}
            <div className = "postPreview-body">
                {parse(converter.makeHtml(post.body))} 
            </div>
        </div>
    )
}
