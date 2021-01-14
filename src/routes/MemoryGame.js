import React, { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { TimeCounter } from '../components/TimeCounter'
import "./MemoryGame.css"
import cardContent from "./cardContent.json";

export const MemoryGame = () => {

    const suffleCards = (arr) => {
        const newArr = arr.slice();
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1)); // 0 ~ i
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    }

    const generateCards = () => {
        // let tmp = [...Array(3).keys()]
        let tmp = cardContent;
        tmp = tmp.concat(tmp);
        tmp = suffleCards(tmp);
        return tmp.map((t) => {
            let obj = {};
            obj.id = Math.random().toString(36).substr(2, 9);
            obj.flipped = true;
            obj.content = t.content;
            obj.matched = false;
            return obj;
        });
    }
    
    const [state, setState] = useState({
        cards: generateCards(), // [{id: , flipped: , ...}, {}, ...]
        isFinished: false,
        gameTurn: 0,
        onAnimation: false,
        matched: 0,
    });

    useEffect(() => {
        if (!state.isFinished && !state.cards.find(card => !card.matched)) {
          setState({ ...state, isFinished: true });
        } 
      }, [state]);

    const handleClick = (id) => {
        if (state.onAnimation) {
            return;
        }
        let cardsToUpdate = state.cards.map((card) => {
            const copyCard = {...card};
            if (copyCard.id === id) {
                copyCard.flipped = false;
            }
            return copyCard;
        });
        
        // 일단 뒤집어
        if (!state.onAnimation) {
            setState({...state, onAnimation: state.gameTurn === 1, gameTurn: (state.gameTurn + 1) % 2, cards: cardsToUpdate});
        }

        const justFlippedCard = cardsToUpdate.find((card) => card.id === id);

        let isMatched = false;

        // find matching card card and 
        cardsToUpdate = cardsToUpdate.map((card) => {
            const copyCard = {...card};
            if (copyCard.content === justFlippedCard.content && copyCard.id !== justFlippedCard.id) {
                if (!copyCard.flipped) {
                    isMatched = true;
                    copyCard.matched = true;
                } else {
                    copyCard.flipped = true;
                }
            }
            return copyCard;
        });

        if (!isMatched) {
            cardsToUpdate = cardsToUpdate.map((card) => {
                const copyCard = {...card};
                if (!copyCard.matched && !copyCard.flipped) {
                    copyCard.flipped = true;
                }
                return copyCard
            })
        } else {
            cardsToUpdate = cardsToUpdate.map((card) => {
                const copyCard = {...card};
                if (copyCard.id === id) {
                    copyCard.matched = true;
                }
                return copyCard
            })
        }
        
        if (!state.onAnimation && state.gameTurn === 1) {
            setTimeout(() => {
                setState({...state, onAnimation: false, matched: isMatched ? state.matched + 1 : state.matched, gameTurn: (state.gameTurn + 1) % 2, cards: cardsToUpdate});
            }, 500);
        }
    }
    
    const generateCardComponents = () => {
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
    const onRestart = () => {
        setState({
            cards: generateCards(), // [{id: , flipped: , ...}, {}, ...]
            isFinished: false,
            gameTurn: 0,
            onAnimation: false,
            waitCardId: 0,
            matched: 0
        });
    }
    return (
        <div className = "memoryGame-container">
            <div className = "memoryGame-info">
                <h1>{`Matched: ${state.matched}`}</h1>
                <h1 className = "memoryGame-time">
                    <TimeCounter isFinished = {state.isFinished} onRestart = {onRestart}/>
                </h1>
            </div>
            {state.isFinished ? (
                <h1>YOU WIN!!!</h1>
            ) : (<></>)}
            <div className = "memoryGame-cards">
                {generateCardComponents()}
            </div>
        </div>
    )
}
