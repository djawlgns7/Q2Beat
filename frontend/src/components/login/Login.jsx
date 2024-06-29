import React from 'react';
import GoogleLoginPage from './GoogleLogin';
import NaverLoginButton from './NaverLogin';
import KakaoLoginButton from './KakaoLogin';
import '../../css/PC.css';
import '../../css/Login.css';
import Q2B from '../../image/Q2BEAT_2.png';
import BackgroundVideo from "../BackgroundVideo.jsx";

const Login = () => {
    return (
        <div className="container-p">
            <BackgroundVideo />
            <div className="Box-p">
                <div className="logoTitle-p">
                    <img src={Q2B} alt="Q2B" className="logoImage-p"/>
                    <h1 className="title-p">Q2BEAT</h1>
                </div>
                <div className="login-btns">
                    <GoogleLoginPage />
                    <NaverLoginButton />
                    <KakaoLoginButton />
                </div>
                <div className="login-footer">
                    <span>서비스 약관 | </span>
                    <span>개인정보 처리방침 | </span>
                    <span>이용약관 | </span>
                    <span><a href={"/notices"} className="notice-link">공지사항</a> | </span>
                    <span><a href={"/notices-board"} className="notice-link">QnA</a></span>
                </div>
            </div>
        </div>
    );
};

export default Login;
