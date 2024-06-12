import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WaitingRoom = () => {
    const [member, setMember] = useState(null);

    useEffect(() => {
        axios.get('/api/session-check')
            .then(res => {
                setMember(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h2>Waiting Room</h2>
            {member ? (
                <p>Welcome, {member.name}</p>
            ) : (
                <p>Loading...</p>
            )}
            {/* 게임 대기실 UI */}
        </div>
    );
};

export default WaitingRoom;
