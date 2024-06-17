import React from 'react';
import './App.css';
import {Link, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ChatRoom from "./components/ChatRoom.jsx";
import AudioComparison from "./components/AudioComparison.jsx";
import HostRoom from "./components/Host/HostRoom.jsx";
import ParticipantRoom from "./components/Participant/ParticipantRoom.jsx";
import {SocketProvider} from "./components/context/SocketContext.jsx";
import CreateRoom from "./components/Host/CreateRoom.jsx";
import JoinRoom from "./components/Participant/JoinRoom.jsx";
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
import {ModalProvider} from "./components/Context/ModalContext.jsx";

const App = () => (
    <ModalProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/set-nickname" element={<SetNickname />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/callback" element={<NaverCallback />} />
                <Route path="/reset" element={<Reset/>}/>
                <Route path="/chat-room" element={<ChatRoom/>}/>
                <Route path="/audio" element={<AudioComparison/>}/>
                <Route path="/host" element={<HostRoom/>}/>
                <Route path="/participant" element={<ParticipantRoom/>}/>

                {/* 소켓 통신 부분 */}

                {/* 호스트 */}
                <Route path="/host/game/create" element={
                    <SocketProvider>
                        <CreateRoom/>
                    </SocketProvider>
                }/>
                <Route path="/host/game/lobby" element={
                    <SocketProvider>
                        <Lobby/>
                    </SocketProvider>
                }/>
                <Route path="/host/game/question" element={
                    <SocketProvider>
                        <QuizGame/>
                    </SocketProvider>
                }/>
                <Route path="/host/game/count" element={
                    <SocketProvider>
                        <QuizCount/>
                    </SocketProvider>
                }/>
                <Route path="/host/game/result" element={
                    <SocketProvider>
                        <QuizResult/>
                    </SocketProvider>
                }/>
                <Route path="/host/game/round/result" element={
                    <SocketProvider>
                        <RoundResult/>
                    </SocketProvider>
                }/>

                {/* 플레이어 */}
                <Route path="/player/game/join" element={
                    <SocketProvider>
                        <JoinRoom/>
                    </SocketProvider>
                }/>
                <Route path="/player/game/waiting" element={
                    <SocketProvider>
                        <PlayerWaiting/>
                    </SocketProvider>
                }/>
                <Route path="/player/game/count" element={
                    <SocketProvider>
                        <PlayerCount/>
                    </SocketProvider>
                }/>
                <Route path="/player/game/question" element={
                    <SocketProvider>
                        <PlayerQuizPage/>
                    </SocketProvider>
                }/>
                <Route path="/player/game/round/result" element={
                    <SocketProvider>
                        <PlayerRoundResult/>
                    </SocketProvider>
                }/>
                <Route path="/player/game/result" element={
                    <SocketProvider>
                        <PlayerResult/>
                    </SocketProvider>
                }/>
            </Routes>
        </Router>
    </ModalProvider>
);

export default App;
