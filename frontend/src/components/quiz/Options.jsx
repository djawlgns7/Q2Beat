const Options = (options) => {
    const box = {
        display: "inline-block",
        justifyContent: "center",
        backgroundColor: "white",
        padding: "5px 10px",
        width: "200px",
        height: "100px",
        margin: "5px 10px",
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

export default Options;