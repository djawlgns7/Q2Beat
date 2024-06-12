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
        const state = params.get('state');
        const tokenType = params.get('token_type');
        const expiresIn = params.get('expires_in');

        if (accessToken) {
            axios.post('/api/members/social-login', {
                memberEmail: 'test@naver.com', // 네이버에서 실제 이메일 가져오도록 수정 필요
                memberName: 'Naver Test', // 네이버에서 실제 이름 가져오도록 수정 필요
                memberPlatform: 'NAVER'
            })
                .then(res => {
                    console.log(res.data);
                    navigate('/main'); // 로그인 후 메인 페이지로 이동
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
