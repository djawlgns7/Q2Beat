import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useSocket} from "../../context/SocketContext.jsx";

const PoseShootAndGrade = ({poseQuiz, roomId, playerName, roundNumber}) => {
    const {hostMessage} = useSocket();
    const [similarity, setSimilarity] = useState('');

    useEffect(() => {
        if (hostMessage.startsWith("ROUNDEND")) {
            updateScore();
        }
    }, [hostMessage]);

    const updateScore = async () => {
        sessionStorage.setItem("playerScore", similarity);
        const fixedSimilarity = Math.round(similarity * 100);

        try {
            const response = await fetch(`/quiz/player/score/update?room_id=R${roomId}&player_name=${playerName}&player_score=${fixedSimilarity}`, {});

            if (!response.ok) {
                throw new Error('Failed to update player score');
            }
        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <div>
            <h1>원하는 유사도를 적으세요</h1>
            <input type={"number"} onChange={(e) => {setSimilarity(e.target.value)}} />
        </div>
    );
}

export default PoseShootAndGrade;