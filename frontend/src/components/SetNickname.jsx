import React, {useEffect, useRef, useState} from 'react';
import axios from '../utils/axios';
import {useNavigate} from 'react-router-dom';
import '../css/PC.css'
import '../css/Host/SetNickname.css'
import Q2B from "../image/Q2BEAT_2.png";
import {useModal} from "./context/ModalContext.jsx";

const SetNickname = () => {
    const [nickname, setNickname] = useState('');
    const [isNicknameValid, setIsNicknameValid] = useState(false); // 상태 변수 추가
    const navigate = useNavigate();
    const member = useRef();
    const {showErrorModal, setModalType, setModalTitle, setModalBody} = useModal();

    useEffect(() => {
        setTimeout(() => member.current = JSON.parse(sessionStorage.getItem('member')), 300);
    }, [])

    useEffect(() => {
        if (isNicknameValid === true) {
            console.log("닉네임 트루됨 이거는 useeffect");
        }
    }, [isNicknameValid])

    const validateNickname = (name) => {
        const regex = /^[가-힣a-zA-Z0-9]+$/;
        return regex.test(name) && name.length >= 2 && name.length <= 8;
    };

    const handleCheckNickname = async () => {
        if (!validateNickname(nickname)) {
            setModalType('error');
            setModalTitle('닉네임 오류');
            setModalBody('닉네임은 한글, 영문 또는 숫자로 구성하여 2~8자로 입력해주세요.');
            showErrorModal();
            return;
        }
        try {
            const checkresponse = await axios.post('/members/check-nickname', {nickname}, {
                withCredentials: true
            });

            if (checkresponse.data.exists) {
                setModalType('error');
                setModalTitle('닉네임 중복');
                setModalBody('이미 존재하는 닉네임입니다.');
                showErrorModal();
                setIsNicknameValid(false); // 중복 시 false로 설정
            } else {
                setModalType('success');
                setModalTitle('닉네임 확인');
                setModalBody('사용 가능한 닉네임입니다!');
                showErrorModal();
                setIsNicknameValid(true); // 유효성 검증 통과 시 true로 설정
                console.log("모달 직후: " + isNicknameValid);
            }
        } catch (error) {
            console.error('Error checking nickname:', error);
            setModalType('error');
            setModalTitle('닉네임 오류');
            setModalBody('닉네임 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
            showErrorModal();
        }

        console.log("nickname", nickname);
        console.log("is nickname valid: " + isNicknameValid);
    };

    const handleSubmit = async () => {
        if (!isNicknameValid) {
            setModalType('error');
            setModalTitle('닉네임 오류');
            setModalBody('닉네임을 먼저 확인해주세요.');
            showErrorModal();
            return;
        }

        try {
            let member = sessionStorage.getItem('member');

            if (member) {
                member = JSON.parse(member);
            } else {
                console.error('Invalid member data in session storage:', member);
                return;
            }

            const response = await axios.post('/members/set-nickname', {nickname}, {
                withCredentials: true
            });

            member.memberUsername = nickname;
            sessionStorage.setItem('member', JSON.stringify(member));
            navigate('/main');
        } catch (error) {
            console.error('Error setting nickname:', error);
            setModalType('error');
            setModalTitle('닉네임 오류');
            setModalBody('닉네임 설정 중 오류가 발생했습니다. 다시 시도해 주세요.');
            showErrorModal();
        }
    };


    return (
        <div className="container-p">
            <div className="loginBox-p">
                <div className="loginTitle-p">
                    <img src={Q2B} alt="Q2B" className="logoImage-p"/>
                    <h1 className="title-p">Q2BEAT</h1>
                </div>
                <div className="nickname-input">
                    <span className="nickname-text">닉네임 :</span>
                    <input value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                    <button onClick={handleCheckNickname} className="check-nickname-btn">닉네임 확인</button>
                </div>
                <button onClick={handleSubmit} className="nickname-btn">확인</button>
            </div>
        </div>
    );
};

export default SetNickname;
