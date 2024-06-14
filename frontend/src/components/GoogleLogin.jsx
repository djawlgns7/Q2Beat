import React from 'react';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../image/google_logo.png';
import '../css/GoogleLogin.css';

const GoogleLoginButton = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = async (tokenResponse) => {
        try {
            const { access_token } = tokenResponse;
            const { data } = await axios.get(`/members/google/userinfo?access_token=${access_token}`);
            const { sub: socialId, name, email } = data;

            const result = await axios.post('/members/social-login', {
                socialId,
                platform: 'google',
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
            console.error('Google login error:', error);
        }
    };

    const login = useGoogleLogin({
        onSuccess: handleLoginSuccess,
        onError: (error) => console.error('Google login error:', error),
    });

    return (
        <div className="google-login-btn" onClick={login}>
            <img src={googleLogo} alt="Google로 로그인"/>
            <span>Google로 로그인</span>
        </div>
    );
};

const GoogleLoginPage = () => {
    const clientId = "975411602786-m61p0e7053pnrpi7j4gl92ftmdpjkj8u.apps.googleusercontent.com";

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLoginButton />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginPage;
