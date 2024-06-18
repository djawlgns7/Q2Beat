import Timer from "../quiz/Timer.jsx";
import {useEffect, useRef, useState} from "react";

const TimerTest = () => {
    const input = useRef(0);
    const intervalRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);

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

    useEffect(() => {
        setCurrentTime(100);
        startTimer();
    }, []);

    return (
        <>
            <Timer time={currentTime}/>
        </>
    )
}

export default TimerTest;