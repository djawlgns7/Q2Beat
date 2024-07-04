import React, {useEffect, useState} from "react";
import Timer from "../Timer.jsx";
import '../../../css/PC.css'
import '../../../css/Quiz/Twister/TwisterQuiz.css'
import Q2B_back from "../../../image/background-image.png";

const TwisterQuiz = ({quiz, nextPlayer, time, onTimeout}) => {

    const [stage, setStage] = useState(false);
    const [setting, setSetting] = useState('');

    useEffect(() => {
        setTimeout(() => setStage(true), 3000);
    }, [])

    useEffect(() => {
        // 마운트 시 세션에서 값을 가져옴
        const settingString = sessionStorage.getItem('setting');
        const setting = JSON.parse(settingString);
        setSetting(setting);
    }, []);

    return (
        <>
            <div className="container-p">
                <div className="contents-box-p">
                    <h2 className="twister-title">Round {setting.round}</h2>
                    <div className="twister-main">
                        {stage === false ? (
                            <h1 className="twister-quiz-player">
                                {nextPlayer}님 차례입니다
                            </h1>
                        ) : (
                            <div className="twister-quiz-content">
                                <div className="twister-quiz-text-box">
                                    <div className="twister-quiz-text">
                                        {quiz.twister_quiz}
                                    </div>
                                </div>
                                <div className="twister-timer">
                                    <Timer time={time} onTimeout={onTimeout}/>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>
                <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
            </div>
        </>

    )
}

export default TwisterQuiz