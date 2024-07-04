import React, {useState} from 'react';
import GoogleLoginPage from './GoogleLogin';
import NaverLoginButton from './NaverLogin';
import KakaoLoginButton from './KakaoLogin';
import '../../css/PC.css';
import '../../css/Login.css';
import '../modal/AdminLoginModal.css'
import Q2B from '../../image/Q2BEAT_2.png';
import AdminLoginModal from "../modal/AdminLoginModal.jsx";
import BackgroundVideo from "../BackgroundVideo.jsx";

const Login = ({setIsAdmin}) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const openLoginModal = () => {
        console.log('modal open');
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        console.log('modal close');
        setIsLoginModalOpen(false);
    };

    const handleAdminLoginSuccess = () => {
        setIsAdmin(true);
        setIsLoginModalOpen(false);
    };

    const handleModalLogin = () => {
        setShowModal(false);
    };

    const handleModalCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="container-p">
            <BackgroundVideo />
            <div className="Box-p">
                <div className="logoTitle-p">
                    <img src={Q2B} alt="Q2B" className="logoImage-p"/>
                    <h1 className="title-p">Q2BEAT</h1>
                </div>
                <div>
                    <button onClick={openLoginModal}>관리자</button>

                    <AdminLoginModal
                        isOpen={isLoginModalOpen}
                        onRequestClose={closeLoginModal}
                        onLoginSuccess={handleAdminLoginSuccess}
                    />
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
                    <span><a href={"/qna"} className="qna-link">QnA</a></span>
                </div>
                <div className="team-member">
                    <span>엄지훈</span>
                    <span>김태웅</span>
                    <span>동재완</span>
                    <span>이학준</span>
                    <span>오민택</span>
                </div>
            </div>
            {showModal && (
                <div className="modal show">
                    <div className="modal-content">
                        <h5>정말 스킵하시겠습니까?</h5>
                        <div className="button-container">
                            <button className="confirm-button" onClick={handleModalLogin}>로그인</button>
                            <button className="cancel-button" onClick={handleModalCancel}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
