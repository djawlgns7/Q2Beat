import React from 'react';
import GoogleLoginPage from './GoogleLogin';
import NaverLoginButton from './NaverLogin';
import KakaoLoginButton from './KakaoLogin';
import '../../App.css';
import '../../css/PC.css';
import '../../css/Login.css';
import Q2B from '../../image/Q2BEAT_2.png';
import Q2B_back from '../../image/Q2Beat_background.png';

const Login = () => {
    return (
        <div className="container-p">
            <div className="loginBox-p">
                <div className="loginTitle-p">
                    <img src={Q2B} alt="Q2B" className="logoImage-p"/>
                    <h1 className="title-p">Q2BEAT</h1>
                </div>
                <div className="login-btns">
                    <GoogleLoginPage />
                    <NaverLoginButton />
                    <KakaoLoginButton />
                </div>
                <div className="footer">
                    <span>서비스 약관 | </span>
                    <span>개인정보 처리방침 | </span>
                    <span>이용약관 | </span>
                    <span><a href={"/notices-board"}>공지사항</a> | </span>
                    <span>QnA</span>
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
        </div>
    );
};

export default Login;
