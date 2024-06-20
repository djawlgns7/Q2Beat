const NormalButton = ({prepareAnswer}) => {
    const box = {
        display: "inline-block",
        justifyContent: "center",
        backgroundColor: "#1A1F44",
        border: "5px solid #516A92",
        borderRadius: "8px",
        color: "white",
        fontSize: "25px",
        padding: "5px 10px",
        width: "200px",
        height: "80px",
        margin: "15px 10px",
    }

    return (
        <>
            <div>
                <button style={box} onClick={() => {
                    prepareAnswer(1);
                }}>1번
                </button>
                <button style={box} onClick={() => {
                    prepareAnswer(2);
                }}>2번
                </button>
            </div>
            <div>
                <button style={box} onClick={() => {
                    prepareAnswer(3);
                }}>3번
                </button>
                <button style={box} onClick={() => {
                    prepareAnswer(4);
                }}>4번
                </button>
            </div>
        </>
    )
}

export default NormalButton;