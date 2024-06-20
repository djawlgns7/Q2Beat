import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListeningText = ({ prepareAnswer, quizData }) => {
    const [answer, setAnswer] = useState('');
    const roomId = sessionStorage.getItem('roomId');
    const playerName = sessionStorage.getItem('playerName');

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = async () => {
        prepareAnswer(answer);

        // 정답을 서버에 전달하는 로직
        try {
            const quizId = sessionStorage.getItem('quizId');
            const response = await fetch('/quiz/send/answer/listening', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quizId: quizId,
                    roomId: roomId,
                    playerName: playerName,
                    answer: answer,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send answer');
            }

            const data = await response.json();
            console.log('Answer submitted successfully:', data);
        } catch (error) {
            console.error('Error sending answer:', error);
        }
    };

    return (
        <div>
            <h3>노래 맞추기 문제</h3>
            {quizData && (
                <>
                    <input
                        type="text"
                        value={answer}
                        onChange={handleAnswerChange}
                        placeholder="정답 입력"
                        className="form-control"
                        style={{ margin: '1rem 0' }}
                    />
                    <button onClick={handleSubmit} className="btn btn-primary">제출</button>
                </>
            )}
        </div>
    );
};

export default ListeningText;
