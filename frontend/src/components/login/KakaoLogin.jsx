import React, { useEffect } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import kakaoLogin from "../../image/kakao_login.png";
import '../../css/KakaoLogin.css';
import { useModal } from '../context/ModalContext.jsx';

const KakaoLoginButton = () => {
    const navigate = useNavigate();
    const { showModal, setModalType, setModalTitle, setModalBody } = useModal();

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
                        url: 'http://bit-two.com:8080/v2/user/me',
                    });
                    const { id: socialId, kakao_account: { profile: { nickname: name }, email } } = userInfo;
                    handleLoginSuccess({ socialId, name, email }, 'kakao');
                } catch (error) {
                    console.error('Kakao API request error:', error);
                    setModalType("error");
                    setModalTitle("로그인 오류");
                    setModalBody("카카오 API 요청 중 오류가 발생했습니다.");
                    showModal();
                }
            },
            fail: (error) => {
                console.error('Kakao login error:', error);
                setModalType("error");
                setModalTitle("로그인 오류");
                setModalBody("카카오 로그인에 실패했습니다. 다시 시도해 주세요.");
                showModal();
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

            const response = result.data;
            if (response.status === 'error') {
                setModalType("error");
                setModalTitle("로그인 오류");
                setModalBody(response.message);
                showModal();
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
            console.error('Social login error:', error);
            setModalType("error");
            setModalTitle("로그인 오류");
            setModalBody('같은 이메일 정보를 가진 계정이 이미 존재합니다.');
            showModal();
        }
    };

    return (
        <button className="kakao-login-btn" onClick={handleLogin}>
            <img src={kakaoLogin} alt="kakaoLogin" className="kakao-login-image"/>
        </button>
    );
};

export default KakaoLoginButton;
