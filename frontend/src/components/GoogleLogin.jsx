import React, { useEffect } from 'react';

const GoogleLoginComponent = () => {
    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: '975411602786-m61p0e7053pnrpi7j4gl92ftmdpjkj8u.apps.googleusercontent.com',
                scope: 'email',
            });
        };

        gapi.load('client:auth2', start);
    }, []);

    const onSuccess = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        const idToken = googleUser.getAuthResponse().id_token;
        console.log('Login Success:', profile);

        // Send token to the backend
        fetch('http://localhost:8080/api/google-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tokenId: idToken }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Login success response:', data);
            });
    };

    const onFailure = (error) => {
        console.log('Login Failed:', error);
    };

    const handleLogin = () => {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then(onSuccess, onFailure);
    };

    return (
        <button className="google-login-button" onClick={handleLogin}>
            <img src="../../public/googleLogo.png" />
            Google로 로그인
        </button>
    );
};

export default GoogleLoginComponent;
