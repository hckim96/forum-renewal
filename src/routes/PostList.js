import React from 'react'
import { useHistory } from 'react-router-dom';
import {PostPreview} from "../components/PostPreview";

export const PostList = ({postList}) => {

    const postView = postList.map((p) => {
        return <PostPreview key = {p.id}
                            post = {p}
                            />
    })

    return (
        <div style = {{marginLeft: "15%", marginRight: "15%", marginBottom: "10%", marginTop: "3%"}}>
            {postView}
        </div>
    )
}
