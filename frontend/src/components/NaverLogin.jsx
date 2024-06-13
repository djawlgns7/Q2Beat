import React, { useEffect } from 'react';
import '../css/NaverLogin.css'

const NaverLoginComponent = () => {
    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: 'vAltMUfRJyDI_bd1mcHY',
            callbackUrl: 'http://localhost:5173/#/naver/callback',
            isPopup: false,
            loginButton: { color: 'green', type: 3, height: '48'}
        });
        naverLogin.init();
    }, []);

    return (
        <div>
            <button id="naverIdLogin" className="naverClassLogin"></button>
        </div>
    );
};

export default NaverLoginComponent;
