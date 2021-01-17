import React, { useEffect, useRef, useState } from 'react'
import "./TimeCounter.css";

export const TimeCounter = ({started, isFinished, onRestart, writeRecord}) => {
    const [state, setState] = useState({
        startTime: Date.now(),
        diff: 0,
        // intervalId: null,
    })
    const intervalRef = useRef(); // TODO: 왜 이거로 하니까 됨? state 로 할땐 안되는데

    const formatTime = (time) => {
        let s = (time / 1000).toFixed(2);
        let m = Math.floor(s / 60);
        s = (s - m * 60).toFixed(2);

        // return `${m}분 ${s}`
        return <div className = "timeCounter-time">
            <span className = "dynamic">{m}</span><span>분</span><span className = "dynamic2">{s}</span><span>초</span>
        </div>
    }

    useEffect(() => {
        if (started) {
            const id = setInterval(() => {
                setState({...state, diff: Date.now() - state.startTime});
            }, 80);
            intervalRef.current = id;
            return () => {
                clearInterval(intervalRef.current);
            }

        }
    }, [state, started])

    useEffect(() => {
        if (isFinished) {
            clearInterval(intervalRef.current);
            writeRecord(state.diff);
        }
    }, [isFinished])

    const handleRestart = () => {
        setState({
            startTime: Date.now(),
            diff: 0
        });
        onRestart();
    }
    return (
        <div className = "timeCounter-container">
            {formatTime(state.diff)}
            <button className = "timeCounter-restartButton" onClick = {handleRestart}>Restart</button>
        </div>
    )
}
