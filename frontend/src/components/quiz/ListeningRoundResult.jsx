import React from 'react';

const ListeningRoundResult = (props) => {
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
            <h3>정답은: {props.correctAnswer}</h3>
            <div>
                <span style={box}>정답자 수: {props.correctCount}</span>
            </div>
        </>
    );
};

export default ListeningRoundResult;
