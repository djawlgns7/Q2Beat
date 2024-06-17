import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios.js';
import CustomModal from '../modal/CustomModal';

const NaverCallback = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
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
            setModalTitle('토큰 오류');
            setModalMessage('액세스 토큰이 없습니다.');
            setModalIsOpen(true);
        }
    }, []);

    const getUserInfo = async (accessToken) => {
        try {
            const response = await axios.get(`/naver/user-info?accessToken=${accessToken}`);
            console.log('Naver API response:', response);

            if (response.data) {
                const { id: socialId, name, email } = response.data.response;
                handleLoginSuccess({ socialId, name, email }, 'naver');
            } else {
                console.error('Failed to get user info from Naver.');
                setModalTitle('사용자 정보 오류');
                setModalMessage('네이버 사용자 정보를 가져오는 데 실패했습니다.');
                setModalIsOpen(true);
            }
        } catch (error) {
            console.error('Error fetching user info from Naver:', error);
            setModalTitle('API 오류');
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
                setModalTitle('로그인 오류');
                setModalMessage(message);
                setModalIsOpen(true);
                return;
            }

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
            setModalTitle('로그인 오류');
            setModalMessage('소셜 로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
            setModalIsOpen(true);
        }
    };

    return (
        <>
            <div>Loading...</div>
            <CustomModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </>
    );
};

export default NaverCallback;
