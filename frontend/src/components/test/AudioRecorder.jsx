import React, { useState, useRef } from 'react';
import axios from 'axios';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
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

        console.log('Transcription:', response.data.text);
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
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
