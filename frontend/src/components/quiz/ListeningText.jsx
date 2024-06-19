import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListeningText = ({ prepareAnswer }) => {
    const [quiz, setQuiz] = useState(null);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`/quiz/get/listening?roomId=1`);
                if (!response.ok) {
                    console.error('Failed to fetch quiz');
                    return;
                }
                const quizData = await response.json();
                setQuiz(quizData);
                sessionStorage.setItem('quizId', quizData.listening_id);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuiz();
    }, []);

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = () => {
        prepareAnswer(answer);
    };

    return (
        <div>
            <h3>노래 맞추기 문제</h3>
            {quiz && (
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
