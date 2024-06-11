import React, { useEffect } from 'react';

const KakaoLoginComponent = () => {
    useEffect(() => {
        window.Kakao.init('968999b5870ed199c9714edd0e7e2e63');

        window.Kakao.Auth.createLoginButton({
            container: '#kakao-login-btn',
            success: function(authObj) {
                console.log('Login Success:', authObj);

                fetch('http://localhost:8080/kakao/callback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: authObj.access_token }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log('Login success response:', data);
                    });
            },
            fail: function(err) {
                console.log('Login Failed:', err);
            }
        });
    }, []);

    return (
        <div>
            <button id="kakao-login-btn"></button>
        </div>
    );
};

export default KakaoLoginComponent;
