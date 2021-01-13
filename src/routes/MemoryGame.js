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
    
    const [state, setState] = useState({
        cards: generateCards(), // [{id: , flipped: , ...}, {}, ...]
        isFinished: false,
        gameTurn: 0,
        onAnimation: false,
        waitCardId: 0,
    });

    const handleClick = (id) => {

        let nextTurn = (state.gameTurn + 1) % 2;
        const cardsToUpdate = state.cards.map((card) => {
            const copyCard = {...card};
            if (copyCard.id === id) {
                copyCard.flipped = false;
            }
            return copyCard;
        });
        
        setState({...state, gameTurn: nextTurn, cards: cardsToUpdate});
        
        if (nextTurn === 1) {
            // gameTurn 0 // flipped one now
            
            setState({...state, waitCardId: id});
        } else {
            // gameTurn 1 // need to flip
            
            let justFlippedCard = state.cards.find((card) => card.id === id);
            // find matching card card and 
            let cardsToUpdate = state.cards.map((card) => {
                const copyCard = {...card};
                if (copyCard.id === state.waitCardId) {
                    if (justFlippedCard.content === copyCard.content) {

                    } else {
                        copyCard.flipped = true;
                    }
                }
                return copyCard;
            });

            cardsToUpdate = cardsToUpdate.map((card) => {
                const copyCard = {...card};
                if (copyCard.id === id) {
                    copyCard.flipped = true;
                }
            })

            setState({...state, cards: cardsToUpdate});
        }
    }

    const generateCardComponents = () => {
        return state.cards.map((obj) => {
            return <Card 
                        handleClick = {handleClick}
                        key = {obj.id}
                        id = {obj.id}
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
