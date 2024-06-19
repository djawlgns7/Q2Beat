import {useEffect, useState} from "react";
import axios from "axios";


const Qna = () => {
    const [qna, setQna] = useState([]);

    useEffect(() => {
        axios.get('/api/qna')
            .then(response => {
                console.log(response.data); //확인하기 위한 콘솔 출력
                setQna(response.data); //백엔드에서의 공지사항 데이터
            })
            .catch(error => {
                console.error('!!QnA 에러 발생!!', error);
            });
    }, []);

    return (
        <div>
            <h1>QnA</h1>
            <ul>
                {qna.map(q => (
                    <li key = {q.qna_id}>{q.question}</li>
                ))}
            </ul>
        </div>
    );
};

export default Qna;