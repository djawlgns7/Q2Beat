import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ChatRoom from "./components/ChatRoom.jsx";
import AudioComparison from "./components/AudioComparison.jsx";
import HostRoom from "./components/Host/HostRoom.jsx";
import ParticipantRoom from "./components/Participant/ParticipantRoom.jsx";
import {SocketProvider} from "./components/socket/SocketContext.jsx";
import ParticipantRoom2 from "./components/Participant/ParticipantRoom2.jsx";
import HostRoom2 from "./components/Host/HostRoom2.jsx";
import CreateRoom from "./components/Host/CreateRoom.jsx";
import WaitingRoom from "./components/Host/WaitingRoom.jsx";
import JoinRoom from "./components/Participant/JoinRoom.jsx";
import WaitingParticipant from "./components/Participant/WaitingParticipant.jsx";
import Login from "./components/Login.jsx";
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

                <Route path="/chat-room" element={<ChatRoom/>}/>
                <Route path="/audio" element={<AudioComparison/>}/>
                <Route path="/host" element={<HostRoom/>}/>
                <Route path="/participant" element={<ParticipantRoom/>}/>
                <Route path="/" element={<AudioComparison/>}/>
                <Route path="/participant2" element={
                    <SocketProvider>
                        <ParticipantRoom2/>
                    </SocketProvider>
                }/>
                <Route path="/host2" element={
                    <SocketProvider>
                        <HostRoom2/>
                    </SocketProvider>
                }/>
                <Route path="/create-room" element={
                    <SocketProvider>
                        <CreateRoom/>
                    </SocketProvider>
                }/>
                <Route path="/waiting-room" element={
                    <SocketProvider>
                        <WaitingRoom/>
                    </SocketProvider>
                }/>
                <Route path="/join-room" element={
                    <SocketProvider>
                        <JoinRoom/>
                    </SocketProvider>
                }/>
                <Route path="/waiting-participant" element={
                    <SocketProvider>
                        <WaitingParticipant/>
                    </SocketProvider>
                }/>
            </Routes>
        </Router>
    );
}

export default App;
