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

    const showModal = () => {
        setState("show");
        setTimeout(() => setState(""), 5000);
    }

    const hideModal = () => {
        setState("hide");
    }

    return (
        <ModalContext.Provider value={{ showModal, hideModal, setModalType, setModalTitle, setModalBody }}>
            <Q2Modal state = {state} modalType = {modalType} modalTitle = {modalTitle} modalBody = {modalBody}/>
            <ErrorModal state={state} modalTitle={modalTitle} modalBody={modalBody} hideModal={hideModal} />
            {children}
        </ModalContext.Provider>
    );
};

// Custom hook
export const useModal = () => {
    return useContext(ModalContext);
};