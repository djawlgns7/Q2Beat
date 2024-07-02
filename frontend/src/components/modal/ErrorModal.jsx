import React from 'react';
import '../../css/Modal/ErrorModal.css';

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