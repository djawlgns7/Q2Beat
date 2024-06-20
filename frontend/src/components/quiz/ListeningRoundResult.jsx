import React from 'react';

const ListeningRoundResult = ({ correctAnswer, correctPlayers }) => {
    const box = {
        display: "inline-block",
        justifyContent: "center",
        backgroundColor: "gray",
        padding: "5px 10px",
        width: "200px",
        height: "100px",
        margin: "5px 10px",
    };

    return (
        <>
            <h3>정답은: {correctAnswer}</h3>
            <div>
                {correctPlayers.length > 0 ? (
                    correctPlayers.map((player, index) => (
                        <div key={index} style={box}>
                            {player.player_name} - 점수 : {player.player_score}
                        </div>
                    ))
                ) : (
                    <div style={box}>정답자가 없습니다...</div>
                )}
            </div>
        </>
    );
};

export default ListeningRoundResult;
