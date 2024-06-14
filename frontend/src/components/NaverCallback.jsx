import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const NaverCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.hash.substring(1));
        let accessToken = urlParams.get('access_token');

        if (!accessToken) {
            urlParams = new URLSearchParams(window.location.search);
            accessToken = urlParams.get('access_token');
        }

        if (accessToken) {
            getUserInfo(accessToken);
        } else {
            console.error('No access token found.');
        }
    }, []);

    const getUserInfo = async (accessToken) => {
        try {
            const response = await axios.get(`/naver/user-info?accessToken=${accessToken}`);
            if (response.data) {
                const { id: socialId, name, email } = response.data.response;
                handleLoginSuccess({ socialId, name, email }, 'naver');
            } else {
                console.error('Failed to get user info from Naver.');
            }
        } catch (error) {
            console.error('Error fetching user info from Naver:', error);
        }
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

    return <div>Loading...</div>;
};

export default NaverCallback;
