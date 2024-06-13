import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KakaoLoginComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.Kakao.init('968999b5870ed199c9714edd0e7e2e63');

        window.Kakao.Auth.createLoginButton({
            container: '#kakao-login-btn',
            success: function(authObj) {
                console.log('Login Success:', authObj);

                axios.post('/api/members/social-login', {
                    socialId: authObj.access_token,
                    platform: 'KAKAO',
                    name: 'Kakao User'
                })
                    .then(res => {
                        if (res.data === 'nickname') {
                            navigate('/set-nickname');
                        } else {
                            navigate('/main');
                        }
                    })
                    .catch(err => console.error('Error during Kakao login:', err));
            },
            fail: function(err) {
                console.log('Login Failed:', err);
            }
        });
    }, [navigate]);

    return (
        <div>
            <div id="kakao-login-btn"></div>
        </div>
    );
};

export default KakaoLoginComponent;
