import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Q2Modal from "../modal/Q2Modal.jsx";

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
        setTimeout(() => setState(""), 500);
    }

    const hideModal = () => {
        setState("hide");
    }

    return (
        <ModalContext.Provider value={{ showModal, hideModal, setModalType, setModalTitle, setModalBody }}>
            <Q2Modal state = {state} modalType = {modalType} modalTitle = {modalTitle} modalBody = {modalBody}/>
            {children}
        </ModalContext.Provider>
    );
};

// PropTypes validation
ModalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook
export const useModal = () => {
    return useContext(ModalContext);
};
