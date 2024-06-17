import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import QRCode from "qrcode.react";

const Q2Modal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (props.state === "show") {
            handleShow();
        } else if (props.state === "hide") {
            handleClose();
        }
    }, [props.state])

    return (
        <>
            {props.modalType === "twoButtons" ? (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{props.modalBody}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : props.modalType === "oneButton" ? (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{props.modalBody}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : props.modalType === "QR" ? (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {props.modalBody}
                        <QRCode value={props.modalBody} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                <></>
            )}
        </>
    );
};

export default Q2Modal;