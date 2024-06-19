import {useParams,useNavigate } from "react-router-dom";
import {useEffect, useRef} from "react";
import {useSocket} from "../context/SocketContext.jsx";
import '../../css/PC.css'
import '../../css/Host/RoomSetting.css'
import Q2B_back from "../../image/Q2Beat_background.png";
import React from "react";


const RoomSetting = () => {
    const {sendMessage, roomId} = useSocket();
    const gameType = String(useParams().id);
    const navigate = useNavigate();
    const setting = useRef(null);

    const colors = ['#00B20D', '#FFD800', '#FF8D00', '#E80091', '#009CE1', '#9A34A1'];

    useEffect(() => {
        if (gameType === "0") {
            setting.current = {
                gameMode: "NORMAL",
                round: 1,
                maxRound: 10,
                timeLimit: 30,
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

    const exitButton=() => {
        navigate("/host/game/lobby");
    }
    return(
      <>
          <div>
              {(()=>{
                  switch (gameType){
                      case '0':
                          return (
                              <div className="roomSetting-container">
                                  <div className="roomSetting-box">
                                      <div className="roomSetting-circle-header">
                                          {colors.map((color, index) => (
                                              <div key={index} className="circle"
                                                   style={{backgroundColor: color}}></div>
                                          ))}
                                      </div>
                                      <label className="roomSetting-label">카테고리
                                          <select onChange={selectChange} className="roomSetting-select">
                                              <option value="category COMMON">상식</option>
                                              <option value="category COUNTRY">나라</option>
                                          </select>
                                      </label>
                                      <label className="roomSetting-label">제한 시간
                                          <select onChange={selectChange} className="roomSetting-select">
                                              <option value="timeLimit 30">30</option>
                                              <option value="timeLimit 20">20</option>
                                          </select>
                                      </label>
                                      <label className="roomSetting-label">라운드 수
                                          <select onChange={selectChange} className="roomSetting-select">
                                              <option value="round 10">10라운드</option>
                                              <option value="round 5">5라운드</option>

                                          </select>
                                      </label>
                                  </div>
                                  <div className="roomSetting-buttons">
                                      <button onClick={clickOnButton} className="roomSetting-btn">시작</button>
                                      <button onClick={exitButton} className="roomSetting-btn">나가기</button>
                                  </div>
                                  <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
                              </div>
                          )

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
          {/*<div>*/}
          {/*    <button onClick={clickOnButton}>시작</button>*/}
          {/*    <button>나가기</button>*/}
          {/*</div>*/}
      </>
    );
}
export default RoomSetting;