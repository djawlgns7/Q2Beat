import React, {useEffect, useState} from "react";
import Timer from "../Timer.jsx";

const TwisterQuiz = ({quiz, nextPlayer, time, onTimeout}) => {

    const [stage, setStage] = useState(false);

    useEffect(() => {
        setTimeout(() => setStage(true), 3000);
    }, [])

    return (
        <>
            {stage === false ? (
                <div>
                    {nextPlayer}님 차례입니다
                </div>
            ) : (
                <div>
                    {quiz.twister_quiz}
                    <Timer time={time} onTimeout={onTimeout}/>
                </div>
            )
            }
        </>

    )
}

export default TwisterQuiz