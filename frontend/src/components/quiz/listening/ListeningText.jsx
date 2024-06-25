import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListeningText = ({ prepareAnswer }) => {
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);

    const onChange = (e) => {
        setAnswer(e.target.value);
    }

    const onSubmit = async () => {
        console.log("Submitting answer: ", answer); // 로그 추가
        const data = await prepareAnswer(answer);
        if(!data.correct) {
            setFeedback("틀렸습니다. 다시 시도하세요");
        }
    }

    return (
        <>
            <div>
                <h3>노래 맞추기 문제</h3>
                <input type="text"
                       className="form-control"
                       value={answer}
                       onChange={onChange}/>
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
