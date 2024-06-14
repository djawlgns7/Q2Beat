// src/components/SetNickname.jsx
import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import '../css/PC.css'
import Q2B from "../image/Q2BEAT_2.png";

const SetNickname = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/members/set-nickname', { nickname });
            const member = JSON.parse(sessionStorage.getItem('member'));
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
                <div className="">
                    <h1>닉네임 :</h1>
                    <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Set your nickname" />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default SetNickname;
