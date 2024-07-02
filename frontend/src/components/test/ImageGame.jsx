import React, {useState, useEffect} from 'react';
import axios from "axios";

function ImageGame() {
    const [imageSrc, setImageSrc] = useState(null);
    const [error, setError] = useState(null);
    const roomId = 93264;
    const player = 'jia';

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://bit-two.com:8080/quiz/pose/image/get?roomId=R${roomId}&playerName=${player}`);
                setImageSrc(`data:image/jpeg;base64,${response.data}`);
            } catch (error) {
                console.error("Error fetching image:", error);
                setError("Failed to load image");
            }
        };

        fetchImage();
    }, []);

    return (
        <div>
            {error ? <p>{error}</p> : (imageSrc ? <img src={imageSrc} alt="Fetched from DB"/> : <p>Loading...</p>)}
        </div>
    );
}

export default ImageGame;
