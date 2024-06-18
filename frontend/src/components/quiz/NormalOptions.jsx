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
        borderRadius: "8px",
        color: "white",
        translate: "0 20px",
    }

    return (
        <>
            <div>
                <span style={box}>{options.first}</span>
                <span style={box}>{options.second}</span>
            </div>
            <div>
                <span style={box}>{options.third}</span>
                <span style={box}>{options.fourth}</span>
            </div>
        </>
    )
}

export default NormalOptions;