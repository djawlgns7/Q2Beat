import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListeningText = ({ quizId, roomId, playerName, prepareAnswer }) => {
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const onChange = (e) => {
        setAnswer(e.target.value);
    }

    const onSubmit = async () => {
        console.log("Submitting answer: ", answer); // 로그 추가

        try {
            const response = await fetch(`/quiz/send/answer/listening?quizId=${quizId}&roomId=${roomId}&playerName=${playerName}&answer=${answer}`);
            const result = await response.json();

            console.log("Response received: ", result);

            if (result.correct) {
                setFeedback('정답입니다!');
                prepareAnswer(answer, true);
            } else {
                setFeedback('오답입니다...');
                prepareAnswer(answer, false);
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            setFeedback('오류가 발생했습니다. 다시 시도해주세요.');
        }
    }

    return (
        <>
            <div>
                <h3>노래 맞추기 문제</h3>
                <input type="text"
                       className="form-control"
                       value={answer}
                       onChange={onChange} />
                <button
                    className="btn btn-primary mt-2"
                    onClick={onSubmit}
                >
                    제출
                </button>
                {feedback && <div className="mt-2">{feedback}</div>}
            </div>
        </>
    );
};

export default ListeningText;
