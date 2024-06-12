import React, { useEffect } from 'react';

const NaverLoginComponent = () => {
    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: 'vAltMUfRJyDI_bd1mcHY',
            callbackUrl: 'http://localhost:5173/#/naver/callback',
            isPopup: false,
            loginButton: { color: 'green', type: 3, height: '60' }
        });
        naverLogin.init();
    }, []);

    return (
        <div>
            <div id="naverIdLogin"></div>
        </div>
    );
};

export default NaverLoginComponent;
