import React from 'react';
import './ErrorModal.css'; // 스타일을 정의하는 CSS 파일

const ErrorModal = ({ state, modalTitle, modalBody, hideModal }) => {
    return (
        <div className={`modal ${state}`}>
            <div className="modal-content">
                <span className="modal-title">{modalTitle}</span>
                <p className="modal-body">{modalBody}</p>
                <button className="close-button" onClick={hideModal}>확인</button>
            </div>
        </div>
    );
};

export default ErrorModal;
