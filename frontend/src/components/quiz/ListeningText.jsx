import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListeningText = ({ prepareAnswer }) => {
    const [answer, setAnswer] = useState('');

    const onChange = (e) => {
        setAnswer(e.target.value);
    }

    const onSubmit =  () => {
        console.log("Submitting answer: ", answer); // 로그 추가
        prepareAnswer(answer);
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
            </div>
        </>
    );
};

export default ListeningText;
