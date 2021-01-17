import React, { useState } from 'react'
import "./RecordModal.css";
import {db} from "../firebase";

export const RecordModal = ({ record, getRecords}) => {
    const [state, setState] = useState({
        username: "",
        display: "",
    })

    const handleRecordWrite = () => {
        let key = db.ref('memoryGameRecord').push().key;
        var updates = {};
        updates['memoryGameRecord/' + key] = {username: state.username, record: record};

        db.ref().update(updates).then(() => {
            getRecords();
        });
    }

    return (
        <div className={`recordModal-container ${state.display}`}
        onClick={(e) => {
            setState({ ...state, display: 'none' });
        }}
            >
            <div className="recordModal-content" onClick = {(e) => {e.stopPropagation()}}>
                <div >
                    걸린 시간: {record}초
                    <span onClick={() => {
                        setState({ ...state, display: 'none' });
                    }}>&times;</span>
                </div>
                <div>
                    <div>
                        닉네임
                    </div>
                    <input
                        autoFocus = {true}
                        placeholder="닉네임을 입력하세요..."
                        className = "recordModal-usernameInput"
                        type="text" value={state.username}
                        onChange={e => setState({...state, username: e.target.value})}
                        onKeyDown = {(e) => {
                            if (e.key == 'Enter') {
                                handleRecordWrite();
                                setState({ ...state, display: 'none' });
                            } else if (e.key == "Escape") {
                                setState({ ...state, display: 'none' });
                            }
                        }}
                    />

                </div>
                <button className = "recordModal-submitButton" 
                onClick = {() => {
                    handleRecordWrite();
                    setState({ ...state, display: 'none' });
                }}>등록하기</button>
            </div>
        </div>
    )
}
