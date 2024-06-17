import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import kakaoLogin from "../../image/kakao_login.png";
import { useNavigate } from 'react-router-dom';
import CustomModal from '../Modal/Q2Modal.jsx';
import '../../css/KakaoLogin.css';

const KakaoLoginButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init('968999b5870ed199c9714edd0e7e2e63');
        }
    }, []);

    const handleLogin = () => {
        window.Kakao.Auth.login({
            success: async (authObj) => {
                try {
                    const userInfo = await window.Kakao.API.request({
                        url: '/v2/user/me',
                    });
                    const { id: socialId, kakao_account: { profile: { nickname: name }, email } } = userInfo;
                    handleLoginSuccess({ socialId, name, email }, 'kakao');
                } catch (error) {
                    console.error('Kakao API request error:', error);
                    setModalMessage('카카오 API 요청 중 오류가 발생했습니다.');
                    setModalIsOpen(true);
                }
            },
            fail: (error) => {
                console.error('Kakao login error:', error);
                setModalMessage('카카오 로그인에 실패했습니다. 다시 시도해 주세요.');
                setModalIsOpen(true);
            },
        });
    };

    const handleLoginSuccess = async (userInfo, platform) => {
        const { socialId, name, email } = userInfo;

        try {
            const result = await axios.post('/members/social-login', {
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
            <button className="kakao-login-btn" onClick={handleLogin}>
                <img src={kakaoLogin} alt="kakaoLogin" className="kakao-login-image"/>
            </button>
            <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                title="로그인 오류"
                message={modalMessage}
            />
        </>
    );
};

export default KakaoLoginButton;
