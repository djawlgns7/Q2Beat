import React from 'react';
import '../css/BackgroundVideo.css';

const BackgroundVideo = () => {
    return (
        <div className="background-video">
            <video autoPlay loop muted>
                <source src="/video/background.webm" type="video/webm"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default BackgroundVideo;