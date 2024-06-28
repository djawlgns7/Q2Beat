import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/Moblie.css';
import Q2B_back from "../../../image/Q2Beat_background.png";
import SoundIcon from "../../../image/free-icon-sound-2.png";
import '../../../css/Quiz/ListeningText.css';

const ListeningText = ({ prepareAnswer, onSkip }) => {
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [skipped, setSkipped] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const onChange = (e) => {
        if (!skipped) {
            setAnswer(e.target.value);
        }
    };

    const onSubmit = async () => {
        if (!skipped) {
            console.log("Submitting answer: ", answer); // 로그 추가
            const data = await prepareAnswer(answer);
            if (!data.correct) {
                setFeedback("틀렸습니다. 다시 시도하세요");
            }
        }
    };

    const handleSkip = async () => {
        setSkipped(true);
        setFeedback("다른 참가자를 기다리는 중입니다");
        const response = await onSkip();
    };

    const handleSkipClick = () => {
        setShowModal(true);
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        handleSkip();
    };

    const handleModalCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="container-m">
            <div className="loginBox-m">
                <div className="listening-main">
                    <h3 className="listening-round-m">Round 1</h3>
                    <img src={SoundIcon} alt="SoundIcon" className="sound-icon"/>
                    {feedback && <div className="mt-2">{feedback}</div>}
                    <input className="listening-input"
                           type="text"
                           value={answer}
                           onChange={onChange}
                           disabled={skipped}
                    />
                    <button className="listening-btn" onClick={onSubmit} disabled={skipped}>제출</button>
                    <button className="listening-btn" onClick={handleSkipClick} disabled={skipped}>스킵</button>

                    {showModal && (
                        <div className="modal show">
                            <div className="modal-content">
                                <h5>정말 스킵하시겠습니까?</h5>
                                <button onClick={handleModalConfirm}>확인</button>
                                <button onClick={handleModalCancel}>취소</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-m"/>
        </div>
    );
};

export default ListeningText;