import React, {useEffect, useState} from "react";
import Timer from "../Timer.jsx";
import '../../../css/PC.css'
import '../../../css/Quiz/Twister/TwisterQuiz.css'
import Q2B_back from "../../../image/Q2Beat_background.png";

const PoseQuiz = ({quiz, nextPlayer}) => {

    const [stage, setStage] = useState(false);

    useEffect(() => {
        setTimeout(() => setStage(true), 3000);
    }, [])

    return (
        <>
            <div className="container-p">
                <div className="twister-box">
                    <div className="twister-header">
                        <h2 className="twister-round">Round 1</h2>
                    </div>
                    <div className="twister-main">
                        {stage === false ? (
                            <h1 className="twister-quiz-player">
                                {nextPlayer}님 차례입니다
                            </h1>
                        ) : (
                            <div className="twister-quiz-content">
                                <div className="twister-quiz-text">
                                    <img src={quiz.pose_image} alt="" />
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

export default PoseQuiz