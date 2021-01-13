import React, { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { TimeCounter } from '../components/TimeCounter'
import "./MemoryGame.css"

export const MemoryGame = () => {
    
    const generateCards = () => {
        // console.log("generateCards()")
        let tmp = [...Array(2).keys()]
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
    useEffect(() => {
        if (!state.isFinished && !state.cards.find(card => !card.matched)) {
          setState({ ...state, isFinished: true });
        }
      }, [state]);

    const handleClick = (id) => {

        // console.log(`handleClick(${id}) state: ${JSON.stringify(state)}`)
        let nextTurn = (state.gameTurn + 1) % 2;
        const cardsToUpdate = state.cards.map((card) => {
            const copyCard = {...card};
            if (copyCard.id === id) {
                copyCard.flipped = false;
            }
            return copyCard;
        });
        
        if (nextTurn === 1) {
            // flipped one now
            
            setState({...state, waitCardId: id, gameTurn: nextTurn, cards: cardsToUpdate});
        } else {
            // need to flip
            
            // 일단 뒤집어
            setState({...state, cards: cardsToUpdate});

            let justFlippedCard = state.cards.find((card) => card.id === id);

            let matched = false;
            // find matching card card and 
            let cardsToUpdate2 = cardsToUpdate.map((card) => {
                const copyCard = {...card};
                if (copyCard.id === state.waitCardId) {
                    if (justFlippedCard.content === copyCard.content) {
                        // console.log('matching card!')
                        matched = true;
                        copyCard.matched = true;
                    } else {
                        copyCard.flipped = true;
                    }
                }
                return copyCard;
            });

            if (!matched) {
                // console.log("!matched")
                cardsToUpdate2 = cardsToUpdate2.map((card) => {
                    const copyCard = {...card};
                    if (copyCard.id === id) {
                        copyCard.flipped = true;
                    }
                    return copyCard
                })
            } else {
                cardsToUpdate2 = cardsToUpdate2.map((card) => {
                    const copyCard = {...card};
                    if (copyCard.id === id) {
                        copyCard.matched = true;
                    }
                    return copyCard
                })
            }
            
            setTimeout(() => {
                setState({...state, gameTurn: nextTurn, cards: cardsToUpdate2});
            }, 700);
        }
    }

    const generateCardComponents = () => {
        // console.log("generateCardComponents()")
        return state.cards.map((obj) => {
            return <Card 
                        handleClick = {handleClick}
                        key = {obj.id}
                        id = {obj.id}
                        content = {obj.content}
                        flipped = {obj.flipped}
                        matched = {obj.matched}
                    />
        })
    }
    return (
        <div className = "memoryGame-container">
            <h1 className = "memoryGame-time">
                <TimeCounter isFinished = {state.isFinished}/>
                </h1>
            <div className = "memoryGame-cards">
                {generateCardComponents()}
            </div>
        </div>
    )
}
