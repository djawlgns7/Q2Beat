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
        textAlign: "center",
    });

    const answerStyle = {
        color: "white",
        fontSize: "40px",
        fontWeight: "bold",
        translate: "0 -100px",
    };

    const { choices, answer } = props;

    return (
        <>
            <h2 style={answerStyle}>정답 : {answer}번</h2>
            <div>
                <span style={boxStyle(answer === "1")}>1. {choices.first}</span>
                <span style={boxStyle(answer === "2")}>2. {choices.second}</span>
            </div>
            <div>
                <span style={boxStyle(answer === "3")}>3. {choices.third}</span>
                <span style={boxStyle(answer === "4")}>4. {choices.fourth}</span>
            </div>
        </>
    )
}

export default NormalRoundResult;