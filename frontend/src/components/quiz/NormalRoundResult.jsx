const NormalRoundResult = (props) => {
    const box = {
        display: "inline-block",
        justifyContent: "center",
        backgroundColor: "gray",
        padding: "5px 10px",
        width: "200px",
        height: "100px",
        margin: "5px 10px",
    }

    return (
        <>
            <h3>정답은: {props.answer}</h3>
            <div>
                <span style={box}>{props.answerNumber.answerOne}</span>
                <span style={box}>{props.answerNumber.answerTwo}</span>
            </div>
            <div>
                <span style={box}>{props.answerNumber.answerThree}</span>
                <span style={box}>{props.answerNumber.answerFour}</span>
            </div>
        </>
    )
}

export default NormalRoundResult;