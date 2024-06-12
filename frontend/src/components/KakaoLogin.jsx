import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KakaoLoginComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.Kakao.init('968999b5870ed199c9714edd0e7e2e63');

        window.Kakao.Auth.createLoginButton({
            container: '#kakao-login-btn',
            success: function(authObj) {
                console.log('Login Success:', authObj);

                axios.post('/api/members/social-login', {
                    memberEmail: 'test@example.com', // 테스트를 위해 하드코딩된 이메일
                    memberName: 'Test User', // 테스트를 위해 하드코딩된 이름
                    memberPlatform: 'KAKAO'
                })
                    .then((res) => {
                        console.log('Login success response:', res.data);
                        navigate('/main'); // 로그인 후 메인 페이지로 이동
                    })
                    .catch((err) => console.error(err));
            },
            fail: function(err) {
                console.log('Login Failed:', err);
            }
        });
    }, [navigate]);

    return (
        <div id="kakao-login-btn"></div>
    );
};

export default KakaoLoginComponent;
