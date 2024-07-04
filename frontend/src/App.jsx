import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import ChatRoom from "./components/ChatRoom.jsx";
import AudioComparison from "./components/test/AudioComparison.jsx";
import {SocketProvider} from "./components/context/SocketContext.jsx";
import CreateRoom from "./components/host/CreateRoom.jsx";
import Lobby from "./components/host/Lobby.jsx";
import JoinRoom from "./components/player/JoinRoom.jsx";
import PlayerWaiting from "./components/player/PlayerWaiting.jsx";
import Reset from "./components/Reset.jsx";
import Login from "./components/login/Login.jsx";
import MainPage from "./components/MainPage.jsx";
import NaverCallback from "./components/login/NaverCallback.jsx";
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
import TimerTest from "./components/test/TimerTest.jsx";
import RoomSetting from "./components/host/RoomSetting.jsx";
import NoticeList from "./components/notice/NoticeList.jsx";
import NoticeDetails from "./components/notice/NoticeDetails.jsx";
import NoticeCreate from "./components/notice/NoticeCreate.jsx";
import NoticeEdit from "./components/notice/NoticeEdit.jsx";
import QnaList from "./components/qna/QnaList.jsx";
import QnaDetails from "./components/qna/QnaDetails.jsx";
import QnaWrite from "./components/qna/QnaWrite.jsx";
import AudioRecorder from "./components/test/AudioRecorder.jsx";
import AudioRecorder2 from "./components/test/AudioRecorder2.jsx";
import AudioRecorder3 from "./components/test/AudioRecorder3.jsx";
import ListeningRoundResult from "./components/quiz/listening/ListeningRoundResult.jsx";
import ListeningPlayerRoundResult from "./components/quiz/listening/ListeningPlayerRoundResult.jsx";
import ListeningQuizResult from "./components/quiz/listening/ListeningQuizResult.jsx";
import CompareStrings from "./components/test/CompareStrings.jsx";
import ImageGame from "./components/test/ImageGame.jsx";
import PosePrediction from "./components/test/PosePrediction.jsx";

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const adminStatus = sessionStorage.getItem('admin');
        if(adminStatus) {
            setIsAdmin(true);
            console.log("admin data session", JSON.parse(adminStatus));
        }
    }, []);

    const handleLoginSuccess = () => {
        console.log('Login Success: isAdmin true');
        setIsAdmin(true);
    }

    return (
        <ModalProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login setIsAdmin={setIsAdmin}/>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/set-nickname" element={<SetNickname/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/callback" element={<NaverCallback/>}/>
                    <Route path="/reset" element={<Reset/>}/>
                    <Route path="/chat-room" element={<ChatRoom/>}/>
                    <Route path="/audio" element={<AudioComparison/>}/>
                    <Route path="/notices" element={<NoticeList isAdmin={isAdmin}/>}/>
                    <Route path="/notices/:notice_id" element={<NoticeDetails isAdmin={isAdmin}/>}/>
                    <Route path="/notices/create" element={<NoticeCreate />} />
                    <Route path="/notices/edit" element={isAdmin ? <NoticeEdit isAdmin={isAdmin}/> : <Navigate to="/" /> }/>
                    <Route path="/notices/edit/:notice_id" element={isAdmin ? <NoticeEdit isAdmin={isAdmin}/> : <Navigate to="/" /> }/>
                    <Route path="/qna" element={<QnaList isAdmin={isAdmin}/>}/>
                    <Route path="/qna/qnaCreate" element={<QnaWrite />}/>
                    <Route path="/qna/:qna_id" element={<QnaDetails isAdmin={isAdmin}/>}/>
                    <Route path="/compare" element={<CompareStrings/>}/>
                    <Route path="/image/game" element={<ImageGame/>}/>
                    <Route path="/pose/game" element={<PosePrediction/>}/>
                    <Route path="*" element={<Navigate to="/" />} />

                    {/* 테스트 */}
                    <Route path="/timer/test" element={<TimerTest/>}/>
                    <Route path="/test/record" element={<AudioRecorder/>}/>
                    <Route path="/test/record2" element={<AudioRecorder2/>}/>
                    <Route path="/test/record3" element={<AudioRecorder3/>}/>

                    {/* 소켓 통신 부분 */}

                    <Route path="/main" element={
                        <SocketProvider>
                            <MainPage/>
                        </SocketProvider>
                    }/>

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
                    <Route path="/host/game/result/listening" element={
                        <SocketProvider>
                            <ListeningQuizResult/>
                        </SocketProvider>
                    }/>
                    <Route path="/host/game/round/result" element={
                        <SocketProvider>
                            <RoundResult/>
                        </SocketProvider>
                    }/>
                    <Route path="/host/game/round/result/listening" element={
                        <SocketProvider>
                            <ListeningRoundResult/>
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
                    <Route path="/player/game/round/result/listening" element={
                        <SocketProvider>
                            <ListeningPlayerRoundResult/>
                        </SocketProvider>
                    }/>
                    <Route path="/player/game/result" element={
                        <SocketProvider>
                            <PlayerResult/>
                        </SocketProvider>
                    }/>
                    <Route path="/player/game/result/listening" element={
                        <SocketProvider>
                            <ListeningPlayerRoundResult/>
                        </SocketProvider>
                    }/>
                </Routes>
            </Router>
        </ModalProvider>
    );
}

export default App;