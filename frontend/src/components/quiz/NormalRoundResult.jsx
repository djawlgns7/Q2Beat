import React from 'react';
import '../../css/Quiz/NormalRoundResult.css'

const NormalRoundResult = (props) => {
    const { choices, answer } = props;

    return (
        <>
            <h2 className="answer-title">정답 : {answer}번</h2>
            <div className="box-container">
                <div className="result-box">
                    <span className={`result-box-info ${answer === "1" ? 'correct' : ''}`}>1. {choices.first}</span>
                </div>
                <div className="result-box">
                    <span className={`result-box-info ${answer === "2" ? 'correct' : ''}`}>2. {choices.second}</span>
                </div>
            </div>
            <div className="box-container">
                <div className="result-box">
                    <span className={`result-box-info ${answer === "3" ? 'correct' : ''}`}>3. {choices.third}</span>
                </div>
                <div className="result-box">
                    <span className={`result-box-info ${answer === "4" ? 'correct' : ''}`}>4. {choices.fourth}</span>
                </div>
            </div>
        </>
    );
}

export default NormalRoundResult;
