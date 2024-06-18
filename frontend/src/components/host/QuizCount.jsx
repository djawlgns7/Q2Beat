import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const QuizCount = () => {
    const [currentTime, setCurrentTime] = useState(3);
    const intervalRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        startTimer(3);
    }, []);

    useEffect(() => {
        if (currentTime === 0) {
            clearInterval(intervalRef.current);
            navigate("/host/game/question");
        }
    }, [currentTime])

    const startTimer = (prevTime) => {
        intervalRef.current = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    }

    return (
        <>
            <div style={{"display": "flex", "alignItems": "center", "justifyContent": "center"}}>
                <h1 style={{"color": "white"}}>{currentTime}</h1>
            </div>
        </>
    )
}

export default QuizCount;