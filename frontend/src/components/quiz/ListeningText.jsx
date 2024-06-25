import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Moblie.css'
import Q2B_back from "../../image/Q2Beat_background.png";
import SoundIcon from "../../image/free-icon-sound-2.png";
import '../../css/Quiz/ListeningText.css'

const ListeningText = ({ prepareAnswer }) => {
    const [answer, setAnswer] = useState('');

    const onChange = (e) => {
        setAnswer(e.target.value);
    }

    const onSubmit =  () => {
        console.log("Submitting answer: ", answer); // 로그 추가
        prepareAnswer(answer);
    }

    return (
        <div className="container-m">
            <div className="loginBox-m">
                <div className="listening-main">
                    <h3 className="listening-round-m">Round 1</h3>
                    <img src={SoundIcon} alt="SoundIcon" className="sound-icon"/>
                    <input className="listening-input"
                           type="text"
                           value={answer}
                           onChange={onChange}/>
                    <button className="listening-btn" onClick={onSubmit}>제출</button>
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
        </div>
    );
};

export default ListeningText;
