import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ isOpen, onRequestClose, title, message }) => {
    return (
        <Modal show={isOpen} onHide={onRequestClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onRequestClose}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
