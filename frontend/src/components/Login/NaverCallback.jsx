import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios.js';
import Q2Modal from '../Modal/Q2Modal';

const NaverCallback = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
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
                setModalMessage('네이버 사용자 정보를 가져오는 데 실패했습니다.');
                setModalIsOpen(true);
            }
        } catch (error) {
            console.error('Error fetching user info from Naver:', error);
            setModalMessage('네이버 사용자 정보를 가져오는 중 오류가 발생했습니다.');
            setModalIsOpen(true);
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
            <div>Loading...</div>
            <Q2Modal
                state={modalIsOpen ? "show" : "hide"}
                modalType="error"
                modalBody={modalMessage}
                onClose={() => setModalIsOpen(false)}
            />
        </>
    );
};

export default NaverCallback;
