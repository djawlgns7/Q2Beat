import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchQnaDetail} from "../../controller/QnaController22.js";

const QnaDetails = () => {
    const [qna_id] = useParams();
    const [qna, setQna] = useState(null);

    useEffect(() => {
        fetchQnaDetail(qna_id, setQna);
    }, [qna_id]);

    return (
        <div>
            <h2>{qna.qna_title}</h2>
            <p>{qna.qna_content}</p>
            <p>{qna.qna_date}</p>
            <p>{qna.member_id}</p>

        </div>
    );
};

export default QnaDetails;