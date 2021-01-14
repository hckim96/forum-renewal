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
        waitCardId: 0,
        matched: 0,
    });

    useEffect(() => {
        if (!state.isFinished && !state.cards.find(card => !card.matched)) {
          setState({ ...state, isFinished: true });
        } 
        // else {
        //     let cnt = 0;
        //     for (let e of state.cards) {
        //         if (e.matched) {
        //             cnt++;
        //         }
        //     }
        //     setState({...state, })
        // }
      }, [state]);

    const handleClick = (id) => {
        let nextTurn = (state.gameTurn + 1) % 2;
        let nextMatchedCnt = state.matched;
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
                nextMatchedCnt++;
            }
            
            setTimeout(() => {
                setState({...state, matched: nextMatchedCnt, gameTurn: nextTurn, cards: cardsToUpdate2});
            }, 700);
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
            <div className = "memoryGame-info" style = {{display: "flex"}}>
                <h1>{state.matched}</h1>
                <h1 className = "memoryGame-time">
                    <TimeCounter isFinished = {state.isFinished} onRestart = {onRestart}/>
                </h1>
            </div>
            <div className = "memoryGame-cards">
                {generateCardComponents()}
            </div>
        </div>
    )
}
