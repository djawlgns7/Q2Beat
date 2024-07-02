import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import '../../css/Host/QuizCount.css';
import '../../css/PC.css'
import backImage from "../../image/background-image.png";

const QuizCount = () => {
    const [currentTime, setCurrentTime] = useState(3);
    const intervalRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        startTimer();
    }, []);

    useEffect(() => {
        if (currentTime === 0) {
            clearInterval(intervalRef.current);
            navigate("/host/game/question");
        }
    }, [currentTime, navigate]);

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    return (
        <div className="container-p">
            <div className="Box-p">
                <TransitionGroup>
                    <CSSTransition
                        key={currentTime}
                        timeout={500}
                        classNames="count"
                    >
                        <h1 className="count-number">{currentTime}</h1>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <img src={backImage} alt="backImage" className="backImage-p"/>
        </div>
    );
};

export default QuizCount;
