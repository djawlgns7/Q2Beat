import React, { createContext, useState, useContext } from 'react';
import Q2Modal from "../modal/Q2Modal.jsx";
import ErrorModal from "../modal/ErrorModal.jsx";

// Context 생성
const ModalContext = createContext();

// Context Provider
export const ModalProvider = ({ children }) => {
    const [state, setState] = useState("");
    const [modalType, setModalType] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [useErrorModal, setUseErrorModal] = useState(true);

    const showModal = () => {
        setState("show");
    }

    const hideModal = () => {
        setState("hide");
    }

    return (
        <ModalContext.Provider value={{ showModal, hideModal, setModalType, setModalTitle, setModalBody, setUseErrorModal }}>
            <Q2Modal state = {state} modalType = {modalType} modalTitle = {modalTitle} modalBody = {modalBody}/>
        </ModalContext.Provider>
    );
};

// Custom hook
export const useModal = () => {
    return useContext(ModalContext);
};