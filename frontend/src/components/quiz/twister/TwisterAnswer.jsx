import {useSocket} from "../../context/SocketContext.jsx";
import {useEffect, useRef} from "react";

const TwisterAnswer = ({myTurn, playerName, currentPlayer}) => {

    const {hostMessage, setHostMessage, roomId, quizId} = useSocket();
    const score = useRef(null);

    useEffect(() => {
        if (hostMessage === "ROUNDEND") {
            if (myTurn) {
                updateScore();
                sessionStorage.setItem("playerScore", score.current);
            }
            setHostMessage("");
        }
    }, [hostMessage]);

    const updateScore = async () => {
        try {
            const response = await fetch(`/quiz/player/score/update?room_id=R${roomId}&player_name=${playerName}&player_score=${score.current}`, {});

            if (!response.ok) {
                throw new Error('Failed to update player score');
            }

        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <>
            {myTurn === true ? (
                <>
                    <h1>여기에 희망하는 점수를 입력(임시)</h1>
                    <input type={"number"} onChange={(e) => score.current = e.target.value}/><br/>
                    <h3>당신 차례입니다!</h3>
                </>
            ) : (
                <>
                    <h3>{currentPlayer}님 차례입니다.</h3>
                </>
            )}

        </>
    )
}

export default TwisterAnswer;