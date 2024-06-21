import React, { useState, useEffect } from 'react';

const MobileView = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMobile = windowDimensions.width <= 600;

    return (
        <div style={{ fontSize: isMobile ? '14px' : '16px' }}>
            <p>This is a responsive text.</p>
            <p>Width: {windowDimensions.width}px</p>
            <p>Height: {windowDimensions.height}px</p>
        </div>
    );
};

export default MobileView;
