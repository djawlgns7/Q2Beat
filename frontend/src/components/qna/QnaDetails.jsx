import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQnaId } from '../../controller/qnaController.js';

const QnaDetails = () => {
    const { qna_id } = useParams();
    const [qna, setQna] = useState(null);

    useEffect(() => {
        const fetchQna = async () => {
            try {
                const data = await getQnaId(qna_id);
                setQna(data);
            } catch (error) {
                console.error('QnA 가져오기 에러:', error);
            }
        };

        fetchQna();
    }, [qna_id]);

    if (!qna) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <h1>QnA 상세 페이지</h1>
            <h2>{qna.qna_title}</h2>
            <p>작성자: {qna.member_username}</p>
            <p>{qna.qna_content}</p>
            <p>작성일: {qna.qna_date}</p>
            {qna.answer_content && (
                <>
                    <h3>관리자 답글</h3>
                    <p>{qna.answer_content}</p>
                    <p>답글 작성일: {qna.answer_date}</p>
                </>
            )}
        </div>
    );
};

export default QnaDetails;
