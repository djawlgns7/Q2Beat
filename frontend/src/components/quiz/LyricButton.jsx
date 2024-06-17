const LyricButton = ({prepareAnswer}) => {
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
                <button style={box} onClick={() => {
                    prepareAnswer();
                }}>
                </button>
            </div>
        </>
    )
}