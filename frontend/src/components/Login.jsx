import React from 'react';
import GoogleLoginComponent from './GoogleLogin';
import NaverLoginComponent from './NaverLogin';
import KakaoLoginComponent from './KakaoLogin';
import '../App.css'
const Login = () => {
    return (
        <div>
            <h2>Login</h2>
            <GoogleLoginComponent />
            <NaverLoginComponent />
            <KakaoLoginComponent />
        </div>
    );
};

export default Login;
