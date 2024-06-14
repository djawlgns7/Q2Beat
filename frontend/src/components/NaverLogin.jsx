import React, { useEffect, useRef } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const NaverLoginButton = () => {
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
            const member = result.data;
            sessionStorage.setItem('member', JSON.stringify(member));
            sessionStorage.setItem('token', result.headers.authorization);
            if (!member.memberUsername) {
                navigate('/set-nickname');
            } else {
                navigate('/main');
            }
        } catch (error) {
            console.error('Social login error:', error);
        }
    };

    return <div id="naverIdLogin" ref={naverRef} />;
};

export default NaverLoginButton;
