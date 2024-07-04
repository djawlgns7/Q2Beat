import { useState } from 'react';
import Modal from 'react-modal';
import axios from '../../utils/axios.js';
import {useNavigate} from "react-router-dom";
import './AdminLoginModal.css';

const AdminLoginModal = ({ isOpen, onRequestClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/admLogin', {
                admin_username: username,
                admin_password: password
            });
            if (response.status === 200) {
                //관리자 정보(JSON데이터)를 세션 스토리지에 저장
                sessionStorage.setItem('admin', JSON.stringify(response.data));
                console.log('Login Admin');
                alert('관리자 로그인 성공');
                onLoginSuccess(); //로그인 성공 콜백
                onRequestClose(); //모달 닫기
                navigate('/'); //관리자 접속 후 페이지 이동
            }
            else {
                sessionStorage.removeItem('admin');
                alert('관리자 로그인 실패');
            }
        } catch (error) {
            console.error('에러 : 관리자 로그인', error);
            alert('관리자 접속 중에 오류 발생');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admLogout');
            if (response.status === 200) {
                sessionStorage.removeItem('sessionId'); //세션 ID를 세션 스토리지에서 제거
                sessionStorage.removeItem('admin'); //admin 정보를 세션에서 제거
                window.confirm('관리자 로그아웃을 하시겠습니까?');
                console.log('Logout Admin')
                onRequestClose();
                navigate('/'); //페이지 리다이렉트
            }
        } catch (error) {
            console.error('에러 : 관리자 로그아웃', error);
            setError('에러 : 관리자 로그아웃');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Admin Login"
            ariaHideApp={false}
        >
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit} method="POST" className="admlogin-form">
                <div className="admlogin-form-group">
                    <label htmlFor="admin_username">Username:</label>
                    <input
                        type="text"
                        id="admin_username"
                        name="admin_username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="admlogin-form-control"
                    />
                </div>
                <div className="admlogin-form-group">
                    <label htmlFor="admin_password">Password:</label>
                    <input
                        type="password"
                        id="admin_password"
                        name="admin_password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="admlogin-form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <div className="admLogout-section">
                <button type="button" className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
            <div className="close-section">
                <button type="button" className="btn btn-close" onClick={onRequestClose}>Close</button>
            </div>
        </Modal>
    );
};

export default AdminLoginModal;
