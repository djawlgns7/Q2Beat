import '../../css/Quiz/NormalButton.css'
import {useState} from "react";

const NormalButton = ({prepareAnswer}) => {

    const [backColor, setBackColor] = useState('white');

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
                        handleButtonClick(1);
                    }}>1번
                    </button>
                </div>
                <div className="normal-button">
                    <button className="normal-button-info" onClick={() => {
                        handleButtonClick(2);
                    }}>2번
                    </button>
                </div>
            </div>
            <div className="normal-btns">
                <div className="normal-button">
                    <button className="normal-button-info" onClick={() => {
                        handleButtonClick(3);
                    }}>3번
                    </button>
                </div>
                <div className="normal-button">
                    <button className="normal-button-info" onClick={() => {
                        handleButtonClick(4);
                    }}>4번
                    </button>
                </div>
            </div>
        </>
    )
}

export default NormalButton;