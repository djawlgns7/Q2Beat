import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const NaverCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');

        if (accessToken) {
            axios.post('/api/members/social-login', {
                socialId: accessToken,
                platform: 'NAVER',
                name: 'Naver User'
            })
                .then(res => {
                    if (res.data === 'nickname') {
                        navigate('/set-nickname');
                    } else {
                        navigate('/main');
                    }
                })
                .catch(err => console.error(err));
        }
    }, [location, navigate]);

    return (
        <div>
            <h2>Naver 로그인 처리 중...</h2>
        </div>
    );
};

export default NaverCallback;
