import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const GoogleLoginButton = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = async (response) => {
        try {
            const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.credential}`);
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

    return (
        <GoogleOAuthProvider clientId="975411602786-m61p0e7053pnrpi7j4gl92ftmdpjkj8u.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.error('Google login error')}
                render={(renderProps) => (
                    <button className="custom-login-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        Login with Google
                    </button>
                )}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;
