import React, {useEffect, useRef, useState} from 'react';
import YouTube from 'react-youtube';
import Q2B_back from "../../../image/Q2Beat_background.png";
import '../../../css/PC.css'
import '../../../css/Quiz/ListeningQuiz.css'
import {hide} from "react-modal/lib/helpers/ariaAppHider.js";

const ListeningQuiz = ({quiz}) => {
    const playerRef = useRef(null);
    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

    useEffect(() => {
        if (quiz && quiz.listening_url) {
            const videoId = extractVideoId(quiz.listening_url);
            if (videoId && playerRef.current) {
                playerRef.current.internalPlayer.cueVideoById(videoId);
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

    const onReady = (event) => {
        playerRef.current = event.target;
    };

    const onError = (event) => {
        console.error('Error occurred while playing the video', event.data);
        switch (event.data) {
            case 2:
                console.error('The request contains an invalid parameter value.');
                break;
            case 5:
                console.error('The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.');
                break;
            case 100:
                console.error('The video requested was not found. It may have been removed or marked as private.');
                break;
            case 101:
            case 150:
                console.error('The owner of the requested video does not allow it to be played in embedded players.');
                break;
            default:
                console.error('An unknown error occurred.');
        }
    };

    return (
        <div className="listening-container">
            <div className="listening-loginBox">
                <div className="circle-header-game">
                    {colors.map((color, index) => (
                        <div key={index} className="circle-game" style={{backgroundColor: color}}></div>
                    ))}
                </div>
                <h2 className="listening-round">Round 1</h2>
                {quiz && quiz.listening_url && (
                    <div>
                        <YouTube
                            className="youtube-player"
                            videoId={extractVideoId(quiz.listening_url)}
                            onReady={onReady}
                            onError={onError}
                            opts={{
                                width: '50%',
                                height: '250px',
                                playerVars: {
                                    'autoplay': 1,
                                    'controls': 1,
                                    'rel': 0,
                                    'modestbranding': 1,
                                    'origin': 'http://localhost:5173', // Add your site domain
                                }
                            }}
                            ref={playerRef}
                        />
                    </div>
                )}
                <p className="listening-text">음악을 듣고 노래 제목을 맞혀주세요!</p>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
        </div>
    );
};

export default ListeningQuiz;
