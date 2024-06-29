import '../../css/Quiz/NormalOptions.css';

const NormalOptions = (options) => {

    return (
        <>
            <div className="normal-options">
                <div className="normal-box">
                    <span className="normal-box-info">1. {options.first}</span>
                </div>
                <div className="normal-box">
                    <span className="normal-box-info">2. {options.second}</span>
                </div>
            </div>
            <div className="normal-options">
                <div className="normal-box">
                    <span className="normal-box-info">3. {options.third}</span>
                </div>
                <div className="normal-box">
                    <span className="normal-box-info">4. {options.fourth}</span>
                </div>
            </div>
        </>
    )
}

export default NormalOptions;