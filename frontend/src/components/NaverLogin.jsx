import React, { useEffect } from 'react';

const NaverLoginComponent = () => {
    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: 'vAltMUfRJyDI_bd1mcHY',
            callbackUrl: 'http://localhost:8080/naver/callback',
            isPopup: false, // 팝업 형태로 설정
            loginButton: { color: 'green', type: 3, height: '60' } // 로그인 버튼 스타일
        });
        naverLogin.init();
    }, []);

    return (
        <div>
            <button id="naverIdLogin"></button>
        </div>
    );
};

export default NaverLoginComponent;
