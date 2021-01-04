import React from 'react'
import {PostPreview} from "../components/PostPreview";

export const PostList = ({postList}) => {

    const postView = postList.map((p) => {
        return <PostPreview post = {p}/>
    })

    return (
        <div style = {{marginLeft: "15%", marginRight: "15%", marginBottom: "10%", marginTop: "3%"}}>
            {postView}
        </div>
    )
}
