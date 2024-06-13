import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/GoogleLogin.css';
import googlelogo from "../image/google_logo.png"; // CSS 파일 불러오기

const GoogleLoginComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const initializeGapi = () => {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                    client_id: '975411602786-m61p0e7053pnrpi7j4gl92ftmdpjkj8u.apps.googleusercontent.com'
                });
            });
        };

        const loadScript = (src, onload) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = onload;
            document.body.appendChild(script);
        };

        loadScript('https://apis.google.com/js/platform.js', initializeGapi);
    }, []);

    const handleGoogleLogin = async () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        try {
            const googleUser = await auth2.signIn();
            const profile = googleUser.getBasicProfile();
            const id_token = googleUser.getAuthResponse().id_token;

            const res = await axios.post('/api/members/social-login', {
                socialId: id_token,
                platform: 'GOOGLE',
                name: profile.getName(),
            });

            if (res.data === 'nickname') {
                navigate('/set-nickname');
            } else {
                navigate('/main');
            }
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };

    return (
        <div className="google-container">
            <button onClick={handleGoogleLogin} className="google-login-btn">
                <img src={googlelogo} alt="googlelogo" className="logoImage"/>
                Google로 로그인
            </button>
        </div>
    );
};

export default GoogleLoginComponent;
