import React, { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { TimeCounter } from '../components/TimeCounter'
import "./MemoryGame.css"
import cardContent from "./cardContent.json";
import { db } from '../firebase';
import { RecordModal } from '../components/RecordModal';

export const MemoryGame = () => {

    const shuffleArr = (arr) => {
        const newArr = arr.slice();
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1)); // 0 ~ i
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr;
    }

    const generateCards = (level) => {
        let tmp = cardContent;
        // let tmp = cardContent.concat(cardContent);
        // tmp = tmp.concat(tmp);
        // tmp = tmp.concat(tmp);
        // tmp = tmp.concat(tmp);
        let width = (level + 1) * 2;
        let cardKindNum = width * (width - level) / 2;
        tmp = shuffleArr(tmp).slice(0, cardKindNum);
        tmp = tmp.concat(tmp);
        tmp = shuffleArr(tmp);
        // console.log(`level ${level} , tmp.length: ${tmp.length}`)
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
        cards: generateCards(1), // [{id: , flipped: , ...}, {}, ...]
        started: false,
        isFinished: false,
        gameTurn: 0,
        onAnimation: false,
        matched: 0,
        recordList: [],
        record: 0,
        level: 1,
    });

    const getRecords = (_level) => {
        let newRecordList = [];
        let order = 1;
        // console.log("getRecords called");
        // db.ref('memoryGameRecord').orderByChild("level").equalTo(level) 
        db.ref('memoryGameRecord').orderByChild("record").once('value', (snapshot) => {
            snapshot.forEach((snap) => {
                if (snap.val().level === _level) {
                    // console.log(`snap val level : ${snap.val().level} , _level : ${_level}`)
                    newRecordList.push({
                        key: snap.key,
                        order: order,
                        username: snap.val().username,
                        record: snap.val().record
                    })
                    order = order + 1;
                }
            })
            // return newRecordList;
            setState({...state, recordList: newRecordList});
        })
    }
    useEffect(() => {
        getRecords(state.level);
    }, [state.level])
    const generateRecordComponent = () => {
        if (state.recordList) {
            return state.recordList.map((r) => {
                return <div key = {r.key}>
                    <div style ={{display: "flex", justifyContent: "space-between", fontWeight: "bold"}}>
                        <div>{r.order}.</div>
                        <div>{r.username}</div>
                        <div>{r.record}초</div>
                    </div>
                </div>
            })

        }
    }
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
                        width = {(state.level + 1) * 2}
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
            ...state,
            cards: generateCards(state.level), // [{id: , flipped: , ...}, {}, ...]
            isFinished: false,
            gameTurn: 0,
            onAnimation: false,
            waitCardId: 0,
            matched: 0,
        });
    }
    const writeRecord = (time) => {
        setState({...state, record: time / 1000});
    }
    const onStart = (level) => {
        setState({...state, 
            cards: generateCards(level), 
            started: true, 
            level: level});
        // console.log(`onStart executed`)
    }
    return (
        <>
            {/* {state.isFinished ? <RecordModal getRecords = {() => {getRecords(state.level)}} record = {state.record} level = {state.level}/> : <></>} */}
            {state.isFinished ? <RecordModal record = {state.record} level = {state.level}/> : <></>}
                {state.started ? (
            <div className = "memoryGame-container">
                    <div className = "memoryGame-main">
                        <div className = "grow-1">
                            <div className = "memoryGame-info">
                                <div>{`Matched: ${state.matched}`}</div>
                                <div className = "memoryGame-time">
                                    <TimeCounter started = {state.started} isFinished = {state.isFinished} onStart = {onStart} onRestart = {onRestart} writeRecord = {writeRecord}/>
                                </div>
                                {state.started && state.isFinished ? (
                                    <div>YOU WIN!!!</div>
                                ) : (<></>)}
                            </div>
                        </div> 
                        <div className = "memoryGame-cards">
                            {generateCardComponents()}
                        </div>

                        <div className = "grow-1">
                            {generateRecordComponent()}
                        </div>
                    </div>
            </div>

                ) : (
                    // <h1>Loading...</h1>
                    <div className = "memoryGame-levelContainer">
                        <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <button className = "memoryGame-levelSelectButton" onClick = {() => {onStart(1)}}>level1</button>
                            <button className = "memoryGame-levelSelectButton" onClick = {() => {onStart(2)}}>level2</button>
                            <button className = "memoryGame-levelSelectButton" onClick = {() => {onStart(3)}}>level3</button>
                        </div>
                    </div>


                )}
        </>
    )
}
