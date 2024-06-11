import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        axios.post('/api/register', {
            email: email,
            password: password
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error("There was an error!", error);
        });
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
