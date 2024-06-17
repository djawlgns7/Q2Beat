import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');  // root 요소를 설정

const CustomModal = ({ isOpen, onRequestClose, title, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Error Modal"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                },
            }}
        >
            <h2>{title}</h2>
            <div>{message}</div>
            <button onClick={onRequestClose}>확인</button>
        </Modal>
    );
};

export default CustomModal;
