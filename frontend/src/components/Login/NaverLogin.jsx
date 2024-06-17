import React, { useEffect, useRef, useState } from 'react';
import axios from '../../utils/axios.js';
import { useNavigate } from 'react-router-dom';
import Q2Modal from '../Modal/Q2Modal';

const NaverLoginButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();
    const naverRef = useRef(null);

    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: 'vAltMUfRJyDI_bd1mcHY',
            callbackUrl: 'http://localhost:5173/callback',
            isPopup: false,
            loginButton: { color: 'green', type: 3, height: 52 }
        });
        naverLogin.init();

        window.addEventListener('load', () => {
            naverLogin.getLoginStatus((status) => {
                if (status) {
                    const { id: socialId, name, email } = naverLogin.user;
                    handleLoginSuccess({ socialId, name, email }, 'naver');
                }
            });
        });

        return () => {
            window.removeEventListener('load', () => {
                naverLogin.getLoginStatus((status) => {
                    if (status) {
                        const { id: socialId, name, email } = naverLogin.user;
                        handleLoginSuccess({ socialId, name, email }, 'naver');
                    }
                });
            });
        };
    }, []);

    const handleLoginSuccess = async (userInfo, platform) => {
        const { socialId, name, email } = userInfo;

        try {
            const result = await axios.post('/api/members/social-login', {
                socialId,
                platform,
                name,
                email,
            });

            const { status, member, message } = result.data;

            if (status === 'error') {
                setModalMessage(message);
                setModalIsOpen(true);
                return;
            }

            sessionStorage.setItem('member', JSON.stringify(member));
            sessionStorage.setItem('token', result.headers.authorization);
            if (!member.memberUsername) {
                navigate('/set-nickname');
            } else {
                navigate('/main');
            }
        } catch (error) {
            console.error('Social login error:', error);
            setModalMessage('소셜 로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
            setModalIsOpen(true);
        }
    };

    return (
        <>
            <div id="naverIdLogin" ref={naverRef} />
            <Q2Modal
                state={modalIsOpen ? "show" : "hide"}
                modalType="error"
                modalBody={modalMessage}
                onClose={() => setModalIsOpen(false)}
            />
        </>
    );
};

export default NaverLoginButton;
