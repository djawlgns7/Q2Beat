import React, { useState } from 'react';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from '../../utils/axios.js';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../image/google_logo.png';
import '../../css/GoogleLogin.css';
import CustomModal from '../modal/CustomModal';

const GoogleLoginButton = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const navigate = useNavigate();

    const handleLoginSuccess = async (tokenResponse) => {
        try {
            const { access_token } = tokenResponse;
            const { data } = await axios.get(`/members/google/userinfo?access_token=${access_token}`);
            const { sub: socialId, name, email } = data;

            const result = await axios.post('/members/social-login', {
                socialId,
                platform: 'google',
                name,
                email,
            });

            const response = result.data;
            if (response.status === 'error') {
                setModalTitle('로그인 오류');
                setModalMessage(response.message);
                setModalIsOpen(true);
                return;
            }

            const member = response.member;
            if (!member) {
                throw new Error('Member data is not defined in the response.');
            }

            sessionStorage.setItem('member', JSON.stringify(member));
            if (!member.memberUsername) {
                navigate('/set-nickname');
            } else {
                navigate('/main');
            }
        } catch (error) {
            console.error('Google login error:', error);

            // 응답 데이터 로그 추가
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }

            setModalTitle('로그인 오류');
            setModalMessage('구글 로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
            setModalIsOpen(true);
        }
    };

    const login = useGoogleLogin({
        onSuccess: handleLoginSuccess,
        onError: (error) => {
            console.error('Google login error:', error);
            setModalTitle('로그인 오류');
            setModalMessage('구글 로그인에 실패했습니다. 다시 시도해 주세요.');
            setModalIsOpen(true);
        },
    });

    return (
        <>
            <div className="google-login-button" onClick={login}>
                <img src={googleLogo} alt="Google로 로그인"/>
                <span>Google로 로그인</span>
            </div>
            <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </>
    );
};

const GoogleLoginPage = () => {
    const clientId = "975411602786-m61p0e7053pnrpi7j4gl92ftmdpjkj8u.apps.googleusercontent.com";

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLoginButton />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginPage;
