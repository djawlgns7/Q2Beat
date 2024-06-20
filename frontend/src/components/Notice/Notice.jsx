import {useEffect, useState} from "react";
import axios from "axios";
import '../../css/Board/Notice.css'


const Notice = () => {
    const [notices, setNotices] = useState([]);

    useEffect( () => {
        axios.get('/api/notices')
            .then(response => {
                console.log(response.data); //확인하기 위한 콘솔 출력
                setNotices(response.data); //백엔드에서의 공지사항 데이터
            })
            .catch(error => {
                console.error('!!공지사항 에러!!', error);
            });
    },[]);

    return (
        <div className="board-container">
            <div className="board-box">
                <h1>공지사항</h1>
                <ul>
                    {notices.map(notice => (
                        <li key = {notice.note_id}>{notice.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Notice;