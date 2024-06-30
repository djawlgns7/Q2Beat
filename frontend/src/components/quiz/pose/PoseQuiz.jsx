import React, {useEffect, useState} from "react";
import Timer from "../Timer.jsx";
import '../../../css/PC.css'
import '../../../css/Quiz/Twister/TwisterQuiz.css'
import Q2B_back from "../../../image/Q2Beat_background.png";

const PoseQuiz = ({quiz, nextPlayer, time, onTimeout}) => {

    const [stage, setStage] = useState(false);
    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

    useEffect(() => {
        setTimeout(() => setStage(true), 3000);
    }, [])

    return (
        <>
            <div className="container-p">
                <div className="twister-box">
                    <div className="twister-header">
                        <div className="circle-header-listening">
                            {colors.map((color, index) => (
                                <div key={index} className="circle-game" style={{backgroundColor: color}}></div>
                            ))}
                        </div>
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
                                <Timer time={time} onTimeout={onTimeout}/>
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