import React, { useEffect } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const KakaoLoginButton = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.Kakao.init('968999b5870ed199c9714edd0e7e2e63');
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
                }
            },
            fail: (error) => {
                console.error('Kakao login error:', error);
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

    return (
        <button className="custom-login-button" onClick={handleLogin}>Login with Kakao</button>
    );
};

export default KakaoLoginButton;
