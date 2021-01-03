import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div style = {{display: "flex", alignItems: "center", textDecoration: "None", justifyContent: "space-between", height: "60px", boxShadow: "0px 0px 3px #000000"}}>
            <Link to = "/">홈</Link>
            <Link to = "/canvas">폭죽놀이</Link>
            <Link>qwjekqwe</Link>
            <Link to = "/write">글 쓰기</Link>
        </div>
    )
}
