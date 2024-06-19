import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function BoardList() {
    const[boardList, setBoardList] = useState([]);
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[memberId, setMemberId] = useState(1);

    //게시글 목록을 가져오는 useEffect
    useEffect(() => {
        axios.get('/api/board/list')
            .then(response => setBoardList(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);

    //게시글 작성 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        const newBoard = {title, content, memberId: memberId};

        axios.post('/api/board/create', newBoard)
            .then(() => {
                setTitle('');
                setContent('');

                //게시글 목록을 새로고침
                return axios.get('/api/board/list');
            })
            .then(response => setBoardList(response.data))
            .catch(error => console.error('Error 게시판 생성:',error));
    };

    return (
        <div>
            <h1>게시판 목록</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input type="text"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           required />
                </div>

                <div>
                    <label>내용:</label>
                    <textarea value={content}
                              onChange={(e) => setContent(e.target.value)}
                              required />
                </div>
                <button type="submit">작성</button>
            </form>
            <ul>
                {boardList.map((board) => (
                    <li key = {board.qbod_id}>
                        <Link to = {`/board/${board.qbod_id}`}>
                            {board.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default BoardList;