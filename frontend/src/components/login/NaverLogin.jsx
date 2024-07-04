import React, { useEffect, useRef } from 'react';
import axios from '../../utils/axios.js';
import { useNavigate } from 'react-router-dom';
import '../../css/NaverLogin.css'

const NaverLoginButton = () => {
    const navigate = useNavigate();
    const naverRef = useRef(null);

    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: 'vAltMUfRJyDI_bd1mcHY',
            callbackUrl: 'https://q2eat.vercel.app/callback',
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

            const response = result.data;
            if (response.status === 'error') {
                alert(response.message);
                return;
            }

            const member = response.member;
            if (!member) {
                throw new Error('Member data is not defined in the response.');
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
            alert('소셜 로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    return <div id="naverIdLogin" ref={naverRef} className="naverClassLogin"/>;
};

export default NaverLoginButton;
