import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import question from "../Question.jsx";
import {useSocket} from "../../context/SocketContext.jsx";

const TwisterRecordAndGrade = ({questionString, roomId, playerName}) => {
    const {hostMessage, setHostMessage} = useSocket();
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [answerString, setAnswerString] = useState('');
    const [similarity, setSimilarity] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        if (answerString !== '') {
            handleCompare();
        }
    }, [answerString]);

    useEffect(() => {
        if (similarity !== '' && similarity !== "Error calculating similarity") {
            updateScore();
        }
    }, [similarity]);

    useEffect(() => {
        if (hostMessage.startsWith("ROUNDEND")) {
            handleStopRecording();
        }
    }, [hostMessage]);

    const handleStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/wav'});
            audioChunksRef.current = [];

            // Create FormData and send the recorded audio to the server
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.wav');

            try {
                const response = await axios.post('http://localhost:8080/api/naver/speech-to-text', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const speechToText = response.data.text;
                console.log('questionString: ', questionString);
                console.log('Transcription: ', speechToText);
                setAnswerString(speechToText);

            } catch (error) {
                console.error('Error transcribing audio:', error);
            }
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const handleStopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        setIsRecorded(true);
    };

    const handleCompare = async () => {
        const response = await fetch('/api/text/compare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: questionString, answer: answerString }),
        });

        const data = await response.json();
        if (data.similarity !== undefined) {
            setSimilarity(data.similarity);
            sessionStorage.setItem('playerScore', data.similarity);
            console.log('similarity: ', data.similarity);
        } else {
            setSimilarity("Error calculating similarity");
        }
    };

    const updateScore = async () => {
        const fixedSimilarity = Math.round(similarity * 100);

        try {
            const response = await fetch(`http://localhost:8080/quiz/player/score/update?room_id=R${roomId}&player_name=${playerName}&player_score=${fixedSimilarity}`, {});

            if (!response.ok) {
                throw new Error('Failed to update player score');
            }
        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <div>
            <button onClick={isRecording ? handleStopRecording : (isRecorded ? null : handleStartRecording)}>
                {isRecording ? '녹음 중지' : (isRecorded ? '녹음 완료' : '녹음 시작')}
            </button>
            {similarity !== null && <p>Similarity: {similarity}%</p>}
        </div>
    );
}

export default TwisterRecordAndGrade;