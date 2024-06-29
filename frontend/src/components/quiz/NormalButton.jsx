import '../../css/Quiz/NormalButton.css'
import {useState} from "react";

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

    const [borderColor, setBorderColor] = useState('#516A92');

    const handleClick = () => {
        setBorderColor(prevColor => (prevColor === '#516A92' ? '#FFD800' : '#516A92'));
    };

    const handleButtonClick = (num) => {
        handleClick();
        prepareAnswer(num);
    }

    return (
        <>
            <div className="normal-btns">
                <button className="normal-button" onClick={() => {
                    handleButtonClick(1);
                }}>1번
                </button>
                <button className="normal-button" onClick={() => {
                    handleButtonClick(2);
                }}>2번
                </button>
            </div>
            <div className="normal-btns">
                <button className="normal-button" onClick={() => {
                    handleButtonClick(3);
                }}>3번
                </button>
                <button className="normal-button" onClick={() => {
                    handleButtonClick(4);
                }}>4번
                </button>
            </div>
        </>
    )
}

export default NormalButton;