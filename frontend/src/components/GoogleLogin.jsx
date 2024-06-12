import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = () => {
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post('/api/members/social-login', {
                memberEmail: 'test@gmail.com', // 테스트를 위해 하드코딩된 이메일
                memberName: 'Google Test', // 테스트를 위해 하드코딩된 이름
                memberPlatform: 'GOOGLE'
            });
            console.log(res.data);
            navigate('/main'); // 로그인 후 메인 페이지로 이동
        } catch (error) {
            console.error(error);
        }
    };

    const handleError = (error) => {
        console.log('Login Failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId="975411602786-m61p0e7053pnrpi7j4gl92ftmdpjkj8u.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginComponent;
