import React, {useEffect, useRef, useState} from 'react';
import Q2B_back from "../../../image/Q2Beat_background.png";
import '../../../css/PC.css'
import '../../../css/Quiz/ListeningQuiz.css'
import ReactPlayer from "react-player";
import SoundIcon from "../../../image/free-icon-sound-2.png";

const ListeningQuiz = ({quiz}) => {
    const playerRef = useRef(null);
    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

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
        <div className="listening-container">
            <div className="listening-loginBox">
                <div className="circle-header-listening">
                    {colors.map((color, index) => (
                        <div key={index} className="circle-game" style={{backgroundColor: color}}></div>
                    ))}
                </div>
                <h2 className="listening-round">Round 1</h2>
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
                    <img src={SoundIcon} alt="SoundIcon" className="sound-icon-2"/>
                    <p className="listening-text">음악을 듣고 노래 제목을 맞혀주세요!</p>
                </div>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
        </div>
    );
};

export default ListeningQuiz;
