import React from 'react';
import GoogleLoginComponent from './GoogleLogin';
import NaverLoginComponent from './NaverLogin';
import KakaoLoginComponent from './KakaoLogin';
import '../App.css';
import '../css/Login.css';
import Q2B from '../image/Q2BEAT_2.png';

const Login = () => {
    return (
        <div className="container">
            <div className="login-box">
                <div className="login-title">
                    <img src={Q2B} alt="Q2B" className="logoImage"/>
                    <h1 className="title">Q2BEAT</h1>
                </div>
                <div className="login-btns">
                    <GoogleLoginComponent />
                    <NaverLoginComponent />
                    <KakaoLoginComponent />
                </div>
                <div className="footer">
                    <span>서비스 약관 | </span>
                    <span>개인정보 처리방침 | </span>
                    <span>이용약관 | </span>
                    <span>공지사항 | </span>
                    <span>고객센터</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
