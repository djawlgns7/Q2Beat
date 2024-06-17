// src/components/SetNickname.jsx
import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import '../css/PC.css'
import '../css/Host/SetNickname.css'
import Q2B from "../image/Q2BEAT_2.png";

const SetNickname = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/members/set-nickname', { nickname });
            let member = sessionStorage.getItem('member');

            if (member && typeof member === 'string' && member.startsWith('{')) {
                member = JSON.parse(member);
            } else {
                console.error('Invalid member data in session storage:', member);
                return;
            }

            member.memberUsername = nickname;
            sessionStorage.setItem('member', JSON.stringify(member));
            navigate('/main');
        } catch (error) {
            console.error('Error setting nickname:', error);
        }
    };

    return (
        <div className="container-p">
            <div className="loginBox-p">
                <div className="loginTitle-p">
                    <img src={Q2B} alt="Q2B" className="logoImage-p"/>
                    <h1 className="title-p">Q2BEAT</h1>
                </div>
                <div className="nickname-input">
                    <span className="nickname-text">닉네임 :</span><input value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                </div>
                <button onClick={handleSubmit} className="nickname-btn">확인</button>
            </div>
        </div>
    );
};

export default SetNickname;
