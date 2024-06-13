import React, { useEffect, useRef } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const NaverLoginButton = () => {
    const navigate = useNavigate();
    const naverRef = useRef();

    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: 'vAltMUfRJyDI_bd1mcHY',
            callbackUrl: 'http://localhost:5173/callback',
            isPopup: false,
            loginButton: { color: 'green', type: 3, height: 60 },
        });

        naverLogin.init();

        // loginButton id를 설정하여 Naver SDK가 올바른 위치에 버튼을 렌더링하도록 합니다.
        document.getElementById('naverIdLogin').innerHTML = '';
        naverLogin.init();

    }, []);

    const handleLoginSuccess = async (userInfo, platform) => {
        const { socialId, name, email } = userInfo;

        try {
            const result = await axios.post('/members/social-login', {
                socialId,
                platform,
                name,
                email,
            });
            const member = result.data;
            sessionStorage.setItem('member', JSON.stringify(member));
            if (!member.memberUsername) {
                navigate('/set-nickname');
            } else {
                navigate('/main');
            }
        } catch (error) {
            console.error('Social login error:', error);
        }
    };

    return <div ref={naverRef} id="naverIdLogin" className="custom-login-button">Login with Naver</div>;
};

export default NaverLoginButton;
