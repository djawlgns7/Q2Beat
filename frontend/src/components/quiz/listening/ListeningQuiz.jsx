import React, {useEffect, useRef, useState} from 'react';
import Q2B_back from "../../../image/background-image.png";
import '../../../css/PC.css'
import '../../../css/Quiz/Listening/ListeningQuiz.css'
import ReactPlayer from "react-player";

const ListeningQuiz = ({quiz}) => {
    const playerRef = useRef(null);
    const [setting, setSetting] = useState('');

    useEffect(() => {
        // 마운트 시 세션에서 값을 가져옴
        const settingString = sessionStorage.getItem('setting');
        const setting = JSON.parse(settingString);
        setSetting(setting);
    }, []);


    useEffect(() => {
        if (quiz && quiz.listening_url) {
            const videoId = extractVideoId(quiz.listening_url);
            if (videoId && playerRef.current) {
                playerRef.current.seekTo(0);
            }
        }
    }, [quiz]);

    const extractVideoId = (url) => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === 'youtu.be') {
                // For short URLs like 'https://youtu.be/haCpjUXIhrI?si=NrZb2-e6bT_I5AFO'
                return urlObj.pathname.substring(1);
            } else if (urlObj.hostname.includes('youtube.com')) {
                // For standard URLs like 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                return urlObj.searchParams.get('v');
            } else {
                throw new Error('Invalid YouTube URL');
            }
        } catch (error) {
            console.error('Failed to extract video ID:', error);
            return null;
        }
    };

    return (
        <div className="container-p">
            <div className="contents-box-p">
                <h2 className="listening-round">Round {setting.round}</h2>
                {quiz && quiz.listening_url && (
                    <div className="video-wrapper">
                        <ReactPlayer
                            url={quiz.listening_url}
                            className="react-player"
                            playing={true}
                            loop
                            volume={0.5}
                            ref={playerRef}
                        />
                    </div>
                )}
                <div className="listening-main">
                    <div className="container-LP">
                        <div className="plate-LP">
                            <div className="black-LP">
                                <div className="border-LP">
                                    <div className="white-LP">
                                        <div className="center-LP"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="player-LP">
                            <div className="rect-LP"></div>
                            <div className="circ-LP"></div>
                        </div>
                    </div>
                    <p className="listening-text">음악을 듣고 노래 제목을 맞혀주세요!</p>
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
        </div>
    );
};

export default ListeningQuiz;
