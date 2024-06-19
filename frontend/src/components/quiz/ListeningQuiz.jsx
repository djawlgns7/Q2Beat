import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const ListeningQuiz = ({ quiz }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        if (quiz && quiz.listening_url) {
            const videoId = extractVideoId(quiz.listening_url);
            if (videoId && playerRef.current) {
                playerRef.current.internalPlayer.cueVideoById(videoId);
            }
        }
    }, [quiz]);

    const extractVideoId = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    };

    const onReady = (event) => {
        playerRef.current = event.target;
    };

    return (
        <div>
            <h3>노래 맞추기 문제</h3>
            {quiz && quiz.listening_url && (
                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                    <YouTube videoId={extractVideoId(quiz.listening_url)} onReady={onReady} ref={playerRef} />
                </div>
            )}
        </div>
    );
};

export default ListeningQuiz;