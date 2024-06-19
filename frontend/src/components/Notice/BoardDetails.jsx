import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';

const BoardDetails = () => {
    const {qbod_id} = useParams();
    const {board, setBoard} = useState(null);

    useEffect(() => {
        axios.get(`/api/board/${qbod_id}`)
            .then(response => setBoard(response.data))
            .catch(error => console.error('Error fetching 게시판 상세내용', error));
    }, [qbod_id]);

    if(!board) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{board.title}</h1>
            <p>{board.content}</p>
            <p>작성자: {board.memberid}</p>
            <p>조회수: </p>
            <p>작성일: {new Date(board.create_date).toLocaleString()}</p>
        </div>
    );
};


export default BoardDetails;