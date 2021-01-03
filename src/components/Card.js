import React from 'react'
import './Card.css'

export const Card = ({number}) => {
    return (
        <div className = "card" style = {{ boxShadow: "3px 3px 10px black", borderRadius: "10px"}}>
            card {number}
        </div>
    )
}

