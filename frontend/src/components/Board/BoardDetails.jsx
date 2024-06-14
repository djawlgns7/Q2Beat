import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function BoardDetails(){
    const {qbod_id} = useParams();
    const [board, setBoard] = useState();

    useEffect(() => {
        fetch(`/api/board/${qbod_id}`)
            .then(response => response.json())
            .then(data => setBoard(data))
            .catch(error => console.error('fetch에서 에러발생', error));
    }, [qbod_id]);

    if(!board) {
        return <div>...Loading</div>
    }

    return (
        <div>
            <h1>{board.title}</h1>
            <p>{board.content}</p>
        </div>
    );
}
export default BoardDetails;