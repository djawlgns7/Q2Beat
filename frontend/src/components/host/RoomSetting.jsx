import {useParams,useNavigate } from "react-router-dom";
import '../../css/PC.css'

const RoomSetting=()=>{
    const gameType=String(useParams().id);
    const navigate=useNavigate();
    let setting={
        gameMode: "NORMAL",
        round: 1,
        maxRound: 2,
        timeLimit: 10,
        category: "COMMON"
    }
    const selectChange=(e)=>{
        //console.log(e.target.value+"\tSetting.jsx from jun")
        const [key,value]=e.target.value.split(' ');
        console.log("key:"+key+",value:"+value+"\tLobby.jsx from jun");
        console.log(setting+"\tLobby.jsx from jun");
        setting={
            ...setting,
            [key]:value,
        }
        console.log(setting+"\tLobby.jsx from jun");
    }
    const clickOnButton=()=>{
        // 객체를 JSON 문자열로 변환하여 저장
        sessionStorage.setItem('setting', JSON.stringify(setting));
        navigate("/host/game/count");
    }
    return(
      <>
          <div>
              {(()=>{
                  switch (gameType){
                      case '0':
                          return (<div>
                              <div>카테고리
                                  <select onChange={selectChange}>
                                      <option value="category commonSense ">상식</option>
                                      <option value="category contry">나라</option>
                                  </select>
                              </div>
                              <div>제한시간
                                  <select onChange={selectChange}>
                                      <option value="timeLimit 30">30</option>
                                      <option value="timeLimit 20">20</option>
                                  </select>
                              </div>
                              <div>라운드 수
                                  <select onChange={selectChange}>
                                      <option value="round 10">10라운드</option>
                                      <option value="round 5">5라운드</option>

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
              <button onClick={clickOnButton}>시작</button>
              <button>나가기</button>
          </div>
      </>
    );
}
export default RoomSetting;