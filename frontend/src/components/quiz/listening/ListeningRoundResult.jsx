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
    const [correctPlayer, setCorrectPlayer] = useState([]);
    const setting = useRef(JSON.parse(sessionStorage.getItem('setting')));
    const [currentRound, setCurrentRound] = useState(setting.current.round);
    const [quiz, setQuiz] = useState(null); // 문제 데이터를 저장할 상태
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoundResult = async () => {
            try {
                const response = await fetch(`https://bit-two.com/quiz/get/round/result/listening?roomId=${roomId}&correctAnswer=${correctAnswer}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch round result');
                }
                const data = await response.json();
                console.log("Fetched round result: ", data); // 콘솔 로그 추가
                setCorrectPlayer(data.correctPlayer);

                const savedQuiz = JSON.parse(sessionStorage.getItem('currentListeningQuiz'));
                setQuiz(savedQuiz);
            } catch (error) {
                console.error('Error fetching round result or quiz data:', error);
            }
        };
        fetchRoundResult();
    }, [roomId, currentRound]);

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

    return (
        <div className="listening-container">
            <div className="listening-loginBox">
                <div className="circle-header-listening">
                    {['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'].map((color, index) => (
                        <div key={index} className="circle-game" style={{backgroundColor: color}}></div>
                    ))}
                </div>
                <h2 className="listening-round-answer">Round {currentRound}</h2>
                <div className="listening-youtube">
                    {quiz && quiz.listening_url && (
                        <div className="video-wrapper-listening">
                            <ReactPlayer
                                url={quiz.listening_url}
                                className="react-player"
                                playing={true}
                                loop
                                volume={0.5}
                                width="500px"
                                height="280px"
                            />
                        </div>
                    )}
                </div>
                <h3 className="listening-correctAnswer">정답 : {correctAnswer}</h3>
            </div>
            <div className="listening-next-round">
                <button onClick={handleNextRound} className="next-round-btn">
                    {correctPlayer ? (
                        <span>
                            {correctPlayer.player_name}님이 정답을 맞추셨습니다!
                        </span>
                    ) : (
                        <span>정답자가 없습니다...</span>
                    )}
                    <span> 다음 라운드로 넘어갑니다.</span>
                </button>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p" />
        </div>
    );
};

export default ListeningRoundResult;
