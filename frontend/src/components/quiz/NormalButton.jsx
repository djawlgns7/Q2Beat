import '../../css/Quiz/NormalButton.css'
import {useState} from "react";

const NormalButton = ({prepareAnswer}) => {

    const [backColor, setBackColor] = useState('#FFFFFF');

    const handleClick = () => {
        setBackColor(prevColor => (prevColor === '#FFFFFF' ? '#000000' : '#FFFFFF'));
    };

    const handleButtonClick = (num) => {
        handleClick();
        prepareAnswer(num);
    }

    return (
        <>
            <div className="normal-btns">
                <div className="normal-button">
                    <button className="normal-button-info" onClick={() => {
                        handleButtonClick(1);}}>
                        <span>1번</span>
                    </button>
                </div>
                <div className="normal-button">
                    <button className="normal-button-info" onClick={() => {
                        handleButtonClick(2);}}>
                        <span>2번</span>
                    </button>
                </div>
            </div>
            <div className="normal-btns">
                <div className="normal-button">
                    <button className="normal-button-info" onClick={() => {
                        handleButtonClick(3);}}>
                        <span>3번</span>
                    </button>
                </div>
                <div className="normal-button">
                    <button className="normal-button-info" onClick={() => {
                        handleButtonClick(4);}}>
                        <span>4번</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default NormalButton;