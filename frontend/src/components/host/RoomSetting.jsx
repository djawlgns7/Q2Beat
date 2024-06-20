import {useParams, useNavigate} from "react-router-dom";
import '../../css/PC.css'
import {useEffect, useRef} from "react";
import {useSocket} from "../context/SocketContext.jsx";

const RoomSetting = () => {
    const {sendMessage, roomId} = useSocket();
    const gameType = String(useParams().id);
    const navigate = useNavigate();
    const setting = useRef(null);

    useEffect(() => {
        if (gameType === "0") {
            setting.current = {
                gameMode: "NORMAL",
                round: 1,
                maxRound: 5,
                timeLimit: 10,
                category: "COMMON"
            }
        } else if (gameType === "1") {

        } else if (gameType === "2") {

        } else if (gameType === "3") {

        }
    }, []);

    const selectChange = (e) => {
        //console.log(e.target.value+"\tSetting.jsx from jun")
        const [key, value] = e.target.value.split(' ');
        console.log("key:" + key + ",value:" + value + "\tLobby.jsx from jun");
        console.log(setting.current + "\tLobby.jsx from jun");
        setting.current = {
            ...setting.current,
            [key]: value,
        }
        console.log(setting.current + "\tLobby.jsx from jun");
    }

    const gameStart = () => {
        // 객체를 JSON 문자열로 변환하여 저장
        sessionStorage.setItem('setting', JSON.stringify(setting.current));
        sendMessage(`START:${roomId}:${setting.current.gameMode}`);
        navigate("/host/game/count");
    }

    const goBack = () => {
        navigate("/host/game/create");
    }

    return (
        <>
            <div>
                {(() => {
                    switch (gameType) {
                        case '0':
                            return (<div>
                                <div>카테고리
                                    <select onChange={selectChange}>
                                        <option value="category COMMON">상식</option>
                                        <option value="category COUNTRY">나라</option>
                                    </select>
                                </div>
                                <div>제한시간
                                    <select onChange={selectChange} defaultValue={"10"}>
                                        <option value="timeLimit 5">5</option>
                                        <option value="timeLimit 10">10</option>
                                        <option value="timeLimit 15">15</option>
                                        <option value="timeLimit 20">20</option>
                                    </select>
                                </div>
                                <div>라운드 수
                                    <select onChange={selectChange}>
                                        <option value="round 1">1라운드</option>
                                        <option value="round 5">5라운드</option>
                                        <option value="round 10">10라운드</option>
                                        <option value="round 15">15라운드</option>
                                    </select>
                                </div>
                            </div>)
                        case '1':
                            return (<div>
                                <div>카테고리
                                    <select onChange={selectChange}>
                                        <option value="option1">발라드</option>
                                        <option value="category rap">랩</option>
                                    </select>
                                </div>
                                <div>라운드 수
                                    <select>
                                        <option value="round 10">10라운드</option>
                                    </select>
                                </div>
                            </div>)
                        case '2':
                            return (<div>
                                <div>카테고리
                                    <select>
                                        <option>발라드</option>
                                    </select>
                                </div>
                                <div>라운드 수
                                    <select>
                                        <option>10라운드</option>
                                    </select>
                                </div>
                            </div>)
                        case '3':
                            return (<div>
                                <div>제한시간
                                    <select>
                                        <option>30초</option>
                                    </select>
                                </div>
                                <div>라운드 수
                                    <select>
                                        <option>10라운드</option>
                                    </select>
                                </div>
                            </div>)
                    }
                })()}
            </div>
            <div>
                <button onClick={gameStart}>시작</button>
                <button onClick={goBack}>나가기</button>
            </div>
        </>
    );
}
export default RoomSetting;