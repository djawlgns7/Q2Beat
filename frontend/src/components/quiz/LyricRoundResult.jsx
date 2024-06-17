const LyricRoundResult = (props) => {
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
            <h3>정답은: {props.answer}입니다</h3>
            <div>
                <span style={box}>{props.answerNumber.answerOne}</span>
            </div>
        </>
    )
}

export default LyricRoundResult;