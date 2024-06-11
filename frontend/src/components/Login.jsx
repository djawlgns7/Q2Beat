import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { NaverLogin } from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';

const Login = () => {
    const handleGoogleSuccess = async (response) => {
        const { profileObj } = response;
        try {
            const res = await axios.post('/api/social-login', {
                email: profileObj.email,
                name: profileObj.name,
                platform: 'GOOGLE'
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNaverSuccess = (response) => {
        const { email, name } = response;
        axios.post('/api/social-login', {
            email,
            name,
            platform: 'NAVER'
        }).then(res => console.log(res.data))
            .catch(err => console.error(err));
    };

    const handleKakaoSuccess = (response) => {
        const { profile } = response;
        const email = profile.kakao_account.email;
        const name = profile.properties.nickname;
        axios.post('/api/social-login', {
            email,
            name,
            platform: 'KAKAO'
        }).then(res => console.log(res.data))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Login</h2>
            <GoogleLogin
                clientId="975411602786-m61p0e7053pnrpi7j4gl92ftmdpjkj8u.apps.googleusercontent.com"
                buttonText="Google로 로그인"
                onSuccess={handleGoogleSuccess}
                onFailure={(error) => console.error(error)}
            />
            <NaverLogin
                clientId="vAltMUfRJyDI_bd1mcHY"
                callbackUrl="http://localhost:8080/naver/callback"
                onSuccess={handleNaverSuccess}
                onFailure={(error) => console.error(error)}
            />
            <KakaoLogin
                token="968999b5870ed199c9714edd0e7e2e63"
                onSuccess={handleKakaoSuccess}
                onFailure={(error) => console.error(error)}
            />
        </div>
    );
};

export default Login;
