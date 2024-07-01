import React, {useState, useEffect, useRef} from 'react';

function ImageGame() {
    const [timer, setTimer] = useState(3);
    const [isComplete, setIsComplete] = useState(false); // 모델 및 웹캠 로딩 여부
    const [model, setModel] = useState(null);
    const [webcam, setWebcam] = useState(null);
    const [stopFlag, setStopFlag] = useState(false);

    const maxPredictions = useRef(-1); // 모델의 class 개수
    const motionResult = useRef(null); // 모션인식 결과값 저장
    const isStopWebcam = useRef(false);

    const targetPose = '하트';

    useEffect(() => {
        const init = async () => {
            // 모델 로딩
            const modelURL = '/image_model/model.json';
            const metadataURL = '/image_model/metadata.json';
            const loadedModel = await window.tmImage.load(modelURL, metadataURL); // tmImage를 글로벌 변수로 사용
            setModel(loadedModel);
            maxPredictions.current = loadedModel.getTotalClasses();

            // 웹캠 로딩
            const loadedWebcam = new window.tmImage.Webcam(500, 500, true); // tmImage를 글로벌 변수로 사용
            await loadedWebcam.setup();
            await loadedWebcam.play();
            setWebcam(loadedWebcam);

            // div에 웹캠 넣기
            document.getElementById("webcam-container").appendChild(loadedWebcam.canvas);

            // 앞의 과정 로딩 완료 여부
            setIsComplete(true);
        };

        init();

        const intervalId = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 0) { // 타이머 시간 끝
                    console.log(motionResult.current);
                    clearInterval(intervalId);
                    setStopFlag(true);
                    isStopWebcam.current = true;
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (isComplete) {
            window.requestAnimationFrame(loop);
        }
    }, [isComplete]);

    async function loop() {
        if (webcam && model && timer > 0) {
            webcam.update();
            await predict();
            if (!isStopWebcam.current) {
                window.requestAnimationFrame(loop);
            }
        }
    }

    // async function predict() {
    //   const prediction = await model.predict(webcam.canvas);
    //   for (let i = 0; i < maxPredictions.current; i++) {
    //     console.log("i:" + prediction[i].probability.toFixed(2));
    //     motionResult.current = prediction[i].probability.toFixed(2);
    //   }
    // }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions.current; i++) {
            if (prediction[i].className === targetPose) {
                console.log(`Probability of ${targetPose}: ${prediction[i].probability.toFixed(2)}`);
                motionResult.current = prediction[i].probability.toFixed(2);
                break;
            }
        }
    }

    return (
        <>
            {isComplete && <div><h2>앞에 보이는 화면과 동일한 포즈를 취해주세요</h2></div>}
            {!isComplete && <div><h3>화면을 로딩중 입니다.</h3></div>}
            <p></p>
            <div id="webcam-container" style={{width: '500px', height: '500px'}}></div>
            {!isStopWebcam.current && <h3>{timer}</h3>}
            {isStopWebcam.current && <h2>점수: {Number(motionResult.current * 100).toFixed(1)}</h2>}
        </>
    );
}

export default ImageGame;
