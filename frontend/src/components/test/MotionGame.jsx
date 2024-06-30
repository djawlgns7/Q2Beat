import React, { useState, useEffect,useRef } from 'react';
import './App.css';
/* 
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
*/

function MotionGame() {
  /* useState로 리렌더링 시, let,const변수의 값이 초기화 되기 때문에 주의하기.
     useState의 setter()메소드는 비동기로 작동할 수 있기에, 가급적 useEffect() 사용하기.
  */
  const [timer, setTimer] = useState(10);
  const [isComplete, setIsComplete] = useState(false); //모델 및 웹캠 로딩 여부.
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [isStopWebcam, setIsStopWebcam]=useState(false);
  const maxPredictions=useRef(-1); //모델의 class 개수.
  const motionResult=useRef(null);  //모션인식 결과값 저장.
  const stopWebcamFlag=useRef(false); //true면, 웹 캠 동작 멈춤.
  const webcamSize=250;

  useEffect(() => {
    const init=(async function() {
      console.log("hello");
      //모델 로딩
      const modelURL = 'src/my_model/model.json';
      const metadataURL = 'src/my_model/metadata.json';
      const loadedModel = await tmPose.load(modelURL, metadataURL);
      setModel(loadedModel);
      maxPredictions.current=loadedModel.getTotalClasses();

      //웹캠 로딩
      const loadedWebcam = new tmPose.Webcam(webcamSize, webcamSize, true);
      await loadedWebcam.setup();
      await loadedWebcam.play();
      setWebcam(loadedWebcam);

      //canvas태그 설정
      const canvas = document.getElementById("canvas");
      canvas.width = webcamSize;
      canvas.height = webcamSize;
      setCtx(canvas.getContext("2d"));
      
      //앞의 과정 로딩 완료 여부
      setIsComplete(true);
    })();

    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) { //타이머 시간 끝.
          clearInterval(intervalId);
          stopWebcamFlag.current=true;
          setIsStopWebcam(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      if (webcam) {
        webcam.stop();
      }
      clearInterval(intervalId);
    };
  }, []);

    useEffect(() => {
      if (isComplete) window.requestAnimationFrame(loop);
    }, [isComplete]);

  async function loop(timestamp) {
    if (webcam && model && timer > 0) {
      webcam.update();
      await predict();
      if(stopWebcamFlag.current===false){
        window.requestAnimationFrame(loop);
      }
    }
  }
  //해당 함수에서 유사도 측정.
  async function predict() {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);
    for (let i = 0; i < maxPredictions.current; i++) {
      console.log("i:"+prediction[i].probability.toFixed(2));
    }
    drawPose(pose);
  }

  function drawPose(pose) {
    if (webcam.canvas && ctx) {
      ctx.drawImage(webcam.canvas, 0, 0);
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }

  return (
    <>
      {isComplete &&<div>{<h2>앞에 보이는 화면과 동일한 포즈를 취해주세요</h2>}</div>}
      {!isComplete &&<div>{<h3>화면을 로딩중 입니다.</h3>}</div>}
      <p></p>
      <div>
        <canvas id="canvas" style={{ width: '500px', height: '500px'}}></canvas>
      </div>
      <div id="label-container"></div>
      {!stopWebcamFlag.current&&<h3>{timer}</h3>}
      {stopWebcamFlag.current&&<h2>점수:{Number(motionResult.current*100).toFixed(1)}</h2>}
    </>
  );
}
export default MotionGame;