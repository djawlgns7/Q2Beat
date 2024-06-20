const NormalRoundResult = (props) => {
    const boxStyle= (isCorrect) => ({
        display: "inline-block",
        justifyContent: "center",
        backgroundColor: "#1A1F44",
        border: isCorrect ? "5px solid #00B20D" : "5px solid #5169A2",
        padding: "20px 10px",
        width: "300px",
        height: "90px",
        margin: "15px 15px",
        borderRadius: "40px",
        color: "white",
        translate: "0 20px",
        fontSize: "25px",
    });

    const answerStyle = {
        color: "white",
        fontSize: "40px",
        fontWeight: "bold",
        translate: "0 -100px",
    };

    const { answerNumber, answer } = props;

    return (
        <>
            <h2 style={answerStyle}>정답 : {answer}번</h2>
            <div>
                <span style={boxStyle(answer === "1")}>1. {answerNumber.answerOne}</span>
                <span style={boxStyle(answer === "2")}>2. {answerNumber.answerTwo}</span>
            </div>
            <div>
                <span style={boxStyle(answer === "3")}>3. {answerNumber.answerThree}</span>
                <span style={boxStyle(answer === "4")}>4. {answerNumber.answerFour}</span>
            </div>
        </>
    )
}

export default NormalRoundResult;