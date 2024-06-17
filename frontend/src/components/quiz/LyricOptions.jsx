const LyricOptions = (options) => {
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
            <div>
                <span style={box}>{options.first}</span>
            </div>
        </>
    )
}

export default LyricOptions;