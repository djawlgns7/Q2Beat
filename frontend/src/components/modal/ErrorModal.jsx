import React from 'react';
import '../../css/Modal/ErrorModal.css';

const ErrorModal = ({ errorState, modalTitle, modalBody, hideErrorModal }) => {

    return (
        <div className={`modal ${errorState}`}>
            <div className="modal-content">
                <span className="modal-title">{modalTitle}</span>
                <p className="modal-body">{modalBody}</p>
                <button className="close-button" onClick={hideErrorModal}>확인</button>
            </div>
        </div>
    );
};

export default ErrorModal;