import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

const TwisterRecordAndGrade = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const [questionString, setQuestionString] = useState('');
    const [answerString, setAnswerString] = useState('');
    const [similarity, setSimilarity] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        if (answerString !== '') {
            handleCompare();
        }
    }, [answerString]);

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

                const speechToText = response.data.text;
                console.log('Transcription:', speechToText);
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
    };

    const handleCompare = async () => {
        const response = await fetch('/api/text/compare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question, answer: answer }),
        });

        const data = await response.json();
        if (data.similarity !== undefined) {
            setSimilarity(data.similarity);
        } else {
            setSimilarity("Error calculating similarity");
        }
    };

    return (
        <div>
            <h1>잰말놀이</h1>
            <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
                {isRecording ? '녹음 중지' : '녹음 시작'}
            </button>
            {audioURL && (
                <div>
                    <audio src={audioURL} controls/>
                </div>
            )}
            <input type="text" value={questionString} onChange={(e) => setQuestionString(e.target.value)} placeholder="Question string" />
            <input type="text" value={answerString} placeholder="Answer string" />
            {similarity !== null && <p>Similarity: {similarity}%</p>}
        </div>
    );
}

export default TwisterRecordAndGrade;