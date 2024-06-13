import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Set your nickname" />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default SetNickname;
