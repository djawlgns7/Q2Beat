import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../../css/Quiz/Timer.css';

const Timer = ({ time, setTimeout2 }) => {
    const [timeLeft, setTimeLeft] = useState(time);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            setTimeout2(true);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const percentage = (timeLeft / time) * 100;

    return (
        <div className="timer-container">
            <CSSTransition in={timeLeft > 0} timeout={1000} classNames="timer-bar" unmountOnExit>
                <div className="timer-bar" style={{ width: `${percentage}%` }} />
            </CSSTransition>
        </div>
    );
};

export default Timer;