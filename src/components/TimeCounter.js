import React, { useEffect, useRef, useState } from 'react'

export const TimeCounter = ({isFinished, onRestart}) => {
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

        return `${m}분 ${s}초`
    }

    useEffect(() => {
        const id = setInterval(() => {
            setState({...state, diff: Date.now() - state.startTime});
        }, 200);
        intervalRef.current = id;
        return () => {
            console.log("useEffect cleanup Executed")
            clearInterval(intervalRef.current);
        }
    }, [state.startTime])

    useEffect(() => {
        if (isFinished) {
            clearInterval(intervalRef.current);
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
        // <div style = {{display: "flex", padding: "1rem"}}>
        <div>
            <div>
                {formatTime(state.diff)}
            </div>
            <button style = {{marginLeft: "1rem"}} onClick = {handleRestart}>Restart</button>
        </div>
    )
}
