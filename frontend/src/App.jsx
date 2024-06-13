import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import SetNickname from "./components/SetNickname";
import NaverCallback from "./components/NaverCallback";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/set-nickname" element={<SetNickname />} />
                <Route path="/naver/callback" element={<NaverCallback />} />
            </Routes>
        </Router>
    );
}

export default App;
