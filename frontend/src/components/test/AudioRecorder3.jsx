import React, { useState, useRef } from 'react';

const AudioRecorder3 = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    try {
      // iOS에서 사용자의 제스처를 통해 오디오 컨텍스트를 활성화
      await new Promise((resolve) => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        context.resume().then(resolve);
      });

      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone', err);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    mediaStreamRef.current.getTracks().forEach(track => track.stop());
  };

  const handleSaveRecording = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    const audioURL = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = audioURL;
    a.download = 'recording.wav';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && (
        <div>
          <audio src={audioURL} controls />
          <button onClick={handleSaveRecording}>Save Recording</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder3;
