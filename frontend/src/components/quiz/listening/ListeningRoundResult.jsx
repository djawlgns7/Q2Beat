import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '../../context/SocketContext.jsx';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../../../css/PC.css';
import '../../../css/Quiz/ListeningQuiz.css'
import '../../../css/Quiz/RoundResult.css';
import '../../../css/Quiz/Listening/ListeningRoundResult.css'
import Q2B_back from "../../../image/Q2Beat_background.png";

const ListeningRoundResult = ({ correctAnswer }) => {
    const { sendMessage, roomId } = useSocket();
    const [correctPlayers, setCorrectPlayers] = useState([]);
    const setting = useRef(JSON.parse(sessionStorage.getItem('setting')));
    const [currentRound, setCurrentRound] = useState(setting.current.round);
    const [quiz, setQuiz] = useState(null);
    const navigate = useNavigate();
    const playerRef = useRef(null);

    const testurl = useRef('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    useEffect(() => {
        const fetchRoundResult = async () => {
            try {
                const response = await fetch(`/quiz/get/round/result/listening?roomId=${roomId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch round result');
                }
                const data = await response.json();
                setCorrectPlayers(data.players);
            } catch (error) {
                console.error('Error fetching round result:', error);
            }
        };

        const fetchQuiz = async () => {
            try {
                const response = await fetch(`/quiz/get/listening?roomId=${roomId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz');
                }
                const data = await response.json();
                console.log(data);
                setQuiz(data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchRoundResult();
        fetchQuiz();
    }, [roomId]);

    const handleNextRound = () => {
        if (currentRound >= setting.current.maxRound) {
            sendMessage(`MESSAGE:${roomId}:HOST:GAMEEND`);
            navigate('/host/game/result');
        } else {
            setting.current.round = Number.parseInt(setting.current.round) + 1;
            sessionStorage.setItem('setting', JSON.stringify(setting.current));
            sendMessage(`MESSAGE:${roomId}:HOST:NEXTROUND`);
            navigate('/host/game/count');
        }
    };
    console.log("퀴즈정답",correctAnswer.current);

    return (
        <div className="listening-container">
            <div className="listening-loginBox">
                <div className="circle-header-listening">
                    {['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'].map((color, index) => (
                        <div key={index} className="circle-game" style={{backgroundColor: color}}></div>
                    ))}
                </div>
                <h2 className="round-answer">Round {currentRound}</h2>
                <div className="listening-youtube">
                    {quiz && quiz.listening_url && (
                        <div className="video-wrapper-listening">
                            <ReactPlayer
                                url={testurl.current}
                                className="react-player"
                                playing={true}
                                loop
                                volume={0.5}
                            />
                        </div>
                    )}
                </div>
                <h3 className="listening-correctAnswer">정답 : {correctAnswer}</h3>
            </div>
            <div className="listening-next-round">
                {correctPlayers.length > 0 ? (
                    correctPlayers.map((player, index) => (
                        <span key={index}>
                            {player.player_name}님이 정답을 맞추셨습니다!
                        </span>
                    ))
                ) : (
                    <span>정답자가 없습니다...</span>
                )}
                <button onClick={handleNextRound} className="next-round-btn">다음 라운드로 넘어갑니다.</button>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
        </div>
    );
};

export default ListeningRoundResult;
