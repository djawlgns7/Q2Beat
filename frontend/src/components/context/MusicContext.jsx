import React, { createContext, useState, useContext } from 'react';

const MusicContext = createContext();

export const useMusic = () => {
    return useContext(MusicContext);
};

export const MusicProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const startMusic = () => setIsPlaying(true);
    const stopMusic = () => setIsPlaying(false);

    return (
        <MusicContext.Provider value={{ isPlaying, startMusic, stopMusic }}>
            {children}
        </MusicContext.Provider>
    );
};
