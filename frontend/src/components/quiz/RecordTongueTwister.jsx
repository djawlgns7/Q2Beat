import React, { useState, useRef } from 'react';
import axios from 'axios';

const RecordTongueTwister = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder.current = new MediaRecorder(stream);
                mediaRecorder.current.ondataavailable = e => {
                    audioChunks.current.push(e.data);
                };
                mediaRecorder.current.onstop = () => {
                    const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
                    const audioURL = URL.createObjectURL(blob);
                    setAudioURL(audioURL);

                    // 녹음된 오디오 파일을 서버로 전송
                    const formData = new FormData();
                    formData.append('file', blob);
                    axios.post('/api/audio/recognize', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }).then(response => {
                        console.log('Recognized text:', response.data.text);
                        // 인식된 텍스트를 사용하여 정답과 비교
                    }).catch(error => {
                        console.error('Error recognizing audio:', error);
                    });
                };
                mediaRecorder.current.start();
                setIsRecording(true);
            }).catch(error => {
                console.error('Error accessing microphone', error);
            });
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
        setIsRecording(false);
    };

    return (
        <div>
            <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
            <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
            {audioURL && <audio src={audioURL} controls />}
        </div>
    );
};

export default RecordTongueTwister