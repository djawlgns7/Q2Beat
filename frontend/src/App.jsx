import React from 'react';
import Login from "./components/Login.jsx";
import WaitingRoom from "./components/WaitingRoom.jsx";
import './App.css';
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import NaverCallback from "./components/NaverCallback.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* 기본 경로에 대한 라우트 추가 */}
                <Route path="/login" element={<Login />}/>
                <Route path="/main" element={<MainPage />} />
                <Route path="/naver/callback" element={<NaverCallback />} /> {/* 네이버 콜백 경로 추가 */}
            </Routes>
        </Router>
    );
}

export default App;
