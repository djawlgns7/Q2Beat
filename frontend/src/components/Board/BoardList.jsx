import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function BoardList() {
    const[board, setBoard] = useState([]);

    useEffect(() => {
        fetch('/api/board')
            .then(response => response.json())
            .then(data => setBoard(data))
            .catch(error => console.error('fetch에서 에러발생:', error));
    }, []);
    return (
        <div>
            <h1>게시판 목록</h1>
            <ul>
                {board.map(board => (
                    <li key = {board.qbod_id}>
                        <Link to={`/board/$/{board.qbod_id}`}>{board.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default BoardList;