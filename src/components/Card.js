import React from 'react'

export const Card = ({number}) => {
    return (
        <div style = {{width: "200px", height: "200px", boxShadow: "3px 3px 10px black", margin: "10px"}}>
            card {number}
        </div>
    )
}
