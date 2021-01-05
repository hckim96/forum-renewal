import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Header.css";

export const Header = () => {
    return (
        <div className = "header-container">
            <NavLink to = "/" exact = {true} className="header-link" activeClassName = "header-activeLink"><span>홈</span></NavLink>
            <NavLink to = "/canvas" className="header-link" activeClassName = "header-activeLink"><span>폭죽놀이</span></NavLink>
            <NavLink to = "/post" className="header-link" activeClassName = "header-activeLink"><span>포스트리스트</span></NavLink>
            <NavLink to = "/write" className="header-link" activeClassName = "header-activeLink"><span>글 쓰기</span></NavLink>
        </div>
    )
}
