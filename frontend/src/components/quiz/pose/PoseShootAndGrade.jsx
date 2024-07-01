import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useSocket} from "../../context/SocketContext.jsx";
import Webcam from "react-webcam";

const PoseShootAndGrade = ({poseQuiz, roomId, playerName, roundNumber}) => {
    const {sendMessage} = useSocket();
    const [model, setModel] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [timer, setTimer] = useState(15); // 타이머 설정
    const webcamRef = useRef(null);

    const targetPose = poseQuiz.pose_name;

    useEffect(() => {
        const loadModel = async () => {
            const modelURL = '/pose_model/model.json';
            const metadataURL = '/pose_model/metadata.json';
            const loadedModel = await window.tmPose.load(modelURL, metadataURL);
            setModel(loadedModel);
            setIsModelLoaded(true);
        };

        loadModel();
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearTimeout(countdown);
        } else {
            capture();
        }
    }, [timer]);

    useEffect(() => {
        if (imageSrc !== null) {
            predictImage();
        }
    }, [imageSrc])

    useEffect(() => {
        if (predictionResult !== null) {
            updateScore();
        }
    }, [predictionResult]);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
        sendImageToSocket(imageSrc);
    };

    const sendImageToSocket = (imageSrc) => {
        sendMessage(`IMAGE:${roomId}:IMAGE:${imageSrc}`);
    };

    const predictImage = async () => {
        if (model && imageSrc) {
            const img = new Image();
            img.src = imageSrc;
            img.onload = async () => {
                const { pose, posenetOutput } = await model.estimatePose(img);
                const prediction = await model.predict(posenetOutput);
                const targetPrediction = prediction.find(p => p.className === targetPose);
                if (targetPrediction) {
                    setPredictionResult(targetPrediction.probability.toFixed(4) * 100);
                } else {
                    setPredictionResult('Target pose not detected.');
                }
            };
        }
    };

    const updateScore = async () => {
        sessionStorage.setItem("playerScore", String(predictionResult));
        const fixedSimilarity = Math.round(predictionResult * 100);

        try {
            const response = await fetch(`http://bit-two.com:8080/quiz/player/score/update?room_id=R${roomId}&player_name=${playerName}&player_score=${fixedSimilarity}`, {});

            if (!response.ok) {
                throw new Error('Failed to update player score');
            }

            setTimeout(() => {
                sendMessage(`MESSAGE:${roomId}:PLAYER:ROUNDEND`);
            }, 300);
        } catch (error) {
            console.error('Error clear room history:', error);
        }
    }

    return (
        <div>
            <h1>Pose Prediction</h1>
            {isModelLoaded ? (
                <>
                    {imageSrc === null ?
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={400}
                            height={300}
                        /> :
                        <img src={imageSrc} alt="Captured" style={{width: '300px', height: 'auto'}}/>
                    }
                    <div>타이머: {timer}초</div>
                    {predictionResult && <p>{predictionResult}</p>}
                </>
            ) : (
                <p>Loading model...</p>
            )}
        </div>
    );
}

export default PoseShootAndGrade;