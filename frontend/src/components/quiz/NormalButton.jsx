const NormalButton = ({prepareAnswer}) => {
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