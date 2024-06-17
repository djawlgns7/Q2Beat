import React from 'react';
import './App.css';
import {Link, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ChatRoom from "./components/ChatRoom.jsx";
import AudioComparison from "./components/AudioComparison.jsx";
import HostRoom from "./components/Host/HostRoom.jsx";
import ParticipantRoom from "./components/Participant/ParticipantRoom.jsx";
import {SocketProvider} from "./components/context/SocketContext.jsx";
import ParticipantRoom2 from "./components/Participant/ParticipantRoom2.jsx";
import HostRoom2 from "./components/Host/HostRoom2.jsx";
import CreateRoom from "./components/Host/CreateRoom.jsx";
import WaitingRoom from "./components/Host/WaitingRoom.jsx";
import JoinRoom from "./components/Participant/JoinRoom.jsx";
import WaitingParticipant from "./components/Participant/WaitingParticipant.jsx";
import Reset from "./components/Reset.jsx";
import Login from "./components/Login.jsx";
import MainPage from "./components/MainPage.jsx";
import NaverCallback from "./components/NaverCallback.jsx";
import SetNickname from "./components/SetNickname.jsx";
import QuizGame from "./components/Host/QuizGame.jsx";
import QuizCount from "./components/Host/QuizCount.jsx";
import QuizResult from "./components/Host/QuizResult.jsx";
import PlayerCount from "./components/Participant/PlayerCount.jsx";
import PlayerQuizPage from "./components/Participant/PlayerQuizPage.jsx";
import PlayerResult from "./components/Participant/PlayerResult.jsx";

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
