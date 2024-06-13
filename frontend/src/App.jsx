import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SetNickname from './components/SetNickname';
import MainPage from './components/MainPage';
import Login from "./components/Login";
import NaverCallback from './components/NaverCallback';

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
