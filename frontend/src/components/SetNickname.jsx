import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SetNickname = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/members/set-nickname', { nickname }, { withCredentials: true });
            if (response.data === 'nickname set') {
                navigate('/main');
            } else {
                alert('Failed to set nickname');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while setting the nickname');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nickname:
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Set Nickname</button>
        </form>
    );
};

export default SetNickname;
