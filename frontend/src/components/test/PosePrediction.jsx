import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

function PosePrediction() {
    const [model, setModel] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [timer, setTimer] = useState(10); // 타이머를 10초로 설정
    const webcamRef = useRef(null);

    const targetPose = '강시'; // 분석하고자 하는 타겟 포즈 이름

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

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
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
                    setPredictionResult(`Probability of ${targetPose}: ${targetPrediction.probability.toFixed(4)}`);
                } else {
                    setPredictionResult('Target pose not detected.');
                }
            };
        }
    };

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
                        <img src={imageSrc} alt="Captured" style={{ width: '300px', height: 'auto' }} />
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

export default PosePrediction;
