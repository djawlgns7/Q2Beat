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
        <div>
            <h3>노래 맞추기 문제</h3>
            {quiz && quiz.listening_url && (
                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                    <YouTube
                        videoId={extractVideoId(quiz.listening_url)}
                        onReady={onReady}
                        onError={onError}
                        opts={{
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
        </div>
    );
};

export default ListeningQuiz;
