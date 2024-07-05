import React, { useEffect, useRef } from 'react';

const AutoPlayAudio = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play().then(() => {
                    console.log("오디오 재생 시작");
                }).catch(error => {
                    console.error("오디오 재생 실패:", error);
                });
            }
        }, 5000);

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }, []);

    return (
        <div>
            <audio ref={audioRef} src="클럽 댄스 배경음악.mp3"></audio>
        </div>
    );
};

export default AutoPlayAudio;
