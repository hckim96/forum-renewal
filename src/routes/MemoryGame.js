import React, { useState } from 'react'
import { Card } from '../components/Card'
import "./MemoryGame.css"
export const MemoryGame = () => {

    const generateCards = () => {
        let tmp = [...Array(10).keys()]
        tmp = tmp.concat(tmp);
        return tmp.map((t) => {
            let obj = {};
            obj.id = Math.random().toString(36).substr(2, 9);
            obj.flipped = true;
            obj.content = t;
            obj.matched = false;
            return obj;
        });
    }
    const handleClick = () => {

    }
    const [state, setState] = useState({
        cards: generateCards(), // [{id: , flipped: , ...}, {}, ...]
        isFinished: false,
        gameTurn: 1,
        onAnimation: false
    })

    const generateCardComponents = () => {
        return state.cards.map((obj) => {
            return <Card 
                        handleClick = {handleClick}
                        key = {obj.id}
                        number = {obj.content}
                        flipped = {obj.flipped}
                        matched = {obj.matched}
                    />
        })
    }
    return (
        <div className = "memoryGame-container">
            {generateCardComponents()}
            {/* <button onClick = {}>click</button> */}
        </div>
    )
}
