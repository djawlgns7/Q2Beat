import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SetNickname from './components/SetNickname';
import MainPage from './components/MainPage';
import Login from "./components/Login/Login.jsx";
import NaverCallback from './components/Login/NaverCallback.jsx';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/set-nickname" element={<SetNickname />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/callback" element={<NaverCallback />} />
        </Routes>
    </Router>
);

export default App;
