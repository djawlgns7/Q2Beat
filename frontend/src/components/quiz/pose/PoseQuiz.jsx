import React, {useEffect, useState} from "react";
import Timer from "../Timer.jsx";
import '../../../css/PC.css'
import '../../../css/Quiz/Pose/PoseQuiz.css'
import Q2B_back from "../../../image/background-image.png";

const PoseQuiz = ({quiz, nextPlayer, time, onTimeout}) => {

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
                    <h2 className="pose-title">Round {setting.round}</h2>
                    <div className="pose-main">
                        {stage === false ? (
                            <h1 className="pose-quiz-player">
                                {nextPlayer}님 차례입니다
                            </h1>
                        ) : (
                            <div className="pose-quiz-content">
                                <div className="pose-quiz-text">
                                    <div className="pose-quiz-image">
                                        <img src={quiz.pose_image} alt="" className="pose-image"/>
                                    </div>
                                </div>
                                <h3 className="pose-quiz-text">포즈를 따라해주세요!</h3>
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

export default PoseQuiz