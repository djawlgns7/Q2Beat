import React, {useEffect, useRef, useState} from 'react';

const BackMusic = ({ src, initialVolume = 0.5, start = 0, end = 110 }) => {
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(initialVolume);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
            audio.currentTime = start;
            audio.play().catch(error => {
                console.error('Error attempting to play audio:', error);
            });

            const handleTimeUpdate = () => {
                if (audio.currentTime >= end) {
                    audio.currentTime = start;
                    audio.play();
                }
            };

            audio.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.pause();
            };
        }
    }, [volume, start, end]);

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    return (
        <div>
            <audio ref={audioRef} loop autoPlay>
                <source src={src} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                style={{marginTop: '10px'}}
            />
        </div>
    );
};

export default BackMusic;
