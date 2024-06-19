import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ChatRoom from "./components/ChatRoom.jsx";
import AudioComparison from "./components/test/AudioComparison.jsx";
import {SocketProvider} from "./components/context/SocketContext.jsx";
import CreateRoom from "./components/host/CreateRoom.jsx";
import Lobby from "./components/host/Lobby.jsx";
import JoinRoom from "./components/player/JoinRoom.jsx";
import PlayerWaiting from "./components/player/PlayerWaiting.jsx";
import Reset from "./components/Reset.jsx";
import Login from "./components/Login.jsx";
import MainPage from "./components/MainPage.jsx";
import NaverCallback from "./components/NaverCallback.jsx";
import SetNickname from "./components/SetNickname.jsx";
import QuizGame from "./components/host/QuizGame.jsx";
import QuizCount from "./components/host/QuizCount.jsx";
import QuizResult from "./components/host/QuizResult.jsx";
import PlayerCount from "./components/player/PlayerCount.jsx";
import PlayerQuizPage from "./components/player/PlayerQuizPage.jsx";
import PlayerResult from "./components/player/PlayerResult.jsx";
import RoundResult from "./components/host/RoundResult.jsx";
import PlayerRoundResult from "./components/player/PlayerRoundResult.jsx";
import {ModalProvider} from "./components/context/ModalContext.jsx";
import Notice from "./components/Notice/Notice.jsx";
import Qna from "./components/Notice/Qna.jsx";
import NoticeBoard from "./components/Notice/NoticeBoard.jsx";
import TimerTest from "./components/test/TimerTest.jsx";
import RoomSetting from "./components/host/RoomSetting.jsx";
import AudioRecorder from "./components/test/AudioRecorder.jsx";

function App() {
    return (
        <ModalProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/set-nickname" element={<SetNickname/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/callback" element={<NaverCallback/>}/>
                    <Route path="/reset" element={<Reset/>}/>
                    <Route path="/chat-room" element={<ChatRoom/>}/>

                    {/* 테스트 */}
                    <Route path="/test/timer" element={<TimerTest/>}/>
                    <Route path="/test/record" element={<AudioRecorder/>}/>
                    <Route path="/audio" element={<AudioComparison/>}/>
                    <Route path="/notices" element={<Notice/>}/>
                    <Route path="/qna" element={<Qna/>}/>
                    <Route path="/notices-board" element={<NoticeBoard/>}/> {/* NoticeBoard 경로 추가 */}

                    {/* 테스트 */}
                    <Route path="/timer/test" element={<TimerTest/>}/>

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
                    <Route path="/host/game/setting/:id" element={
                        <SocketProvider>
                            <RoomSetting/>
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
}

export default App;
