const NormalOptions = (options) => {
    const box = {
        display: "inline-block",
        justifyContent: "center",
        backgroundColor: "#1A1F44",
        border: "5px solid #5169A2",
        padding: "20px 10px",
        width: "300px",
        height: "90px",
        margin: "15px 15px",
        borderRadius: "40px",
        color: "white",
        translate: "0 20px",
        fontSize: "25px",
    }

    return (
        <>
            <div>
                <span style={box}>1. {options.first}</span>
                <span style={box}>2. {options.second}</span>
            </div>
            <div>
                <span style={box}>3. {options.third}</span>
                <span style={box}>4. {options.fourth}</span>
            </div>
        </>
    )
}

export default NormalOptions;