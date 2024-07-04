import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteQna, getQnaId, insertAnswer} from '../../controller/qnaController.js';
import '../../css/Qna/QnaDetails.css';

const QnaDetails = ({isAdmin}) => {
    const { qna_id } = useParams();
    const [qna, setQna] = useState(null);
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

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

    //이전 페이지로 이동하는 함수
    const goToPreviousPage = () => {
        navigate('/qna'); // 이전 페이지로 이동
    };

    const handleAnswerSubmit = async () => {
        try {
            const answerData = {
                qna_id,
                admin_username: '관리자 이름',
                answer_content: answer,
                answer_date: new Date().toISOString()
            }
            await insertAnswer(answerData);
            setAnswer('');
            navigate(0); //답글 등록하면 현재경로 새로고침
        } catch(error){
            console.error('답글 등록 에러', error);
        }
    }

    const handleDelete = async (qna_id) => {
        try {
            await deleteQna(qna_id);
            navigate('/qna');
            window.confirm("정말 삭제 하시겠습니까?");
        } catch (error) {
            console.error('에러 : QnA 삭제', error);
        }
    };

    return (
        <div className="qna-details">
            <h1 className="qna-title">Q&A 상세 페이지</h1>
            <button className="back-btn" onClick={goToPreviousPage}>이전</button>
            <button className="delete-btn" onClick={() =>
                handleDelete(qna.qna_id)}>삭제</button>
            <div className="qna-content">
                <h2 className="qna-subtitle">{qna.qna_title}</h2>
                <p className="qna-info"><strong>작성자:</strong> {qna.member_username}</p>
                <p className="qna-info"><strong>작성일:</strong> {qna.qna_date}</p>
                <p className="qna-text">{qna.qna_content}</p>
            </div>
            {qna.answer_content ? (
                <div className="answer-content">
                    <h3>관리자 답글</h3>
                    <p className="answer-text">{qna.answer_content}</p>
                    <p className="answer-info"><strong>작성자:</strong>{qna.admin_username}</p>
                    <p className="answer-info"><strong>답글 작성일:</strong> {qna.answer_date}</p>
                </div>
            ) : (
                isAdmin && (
                    <div className="answer-form">
                        <h3>답글 작성</h3>
                        <textarea value={answer}
                                  onChange={(e) => setAnswer(e.target.value)}
                                  className="answer-textarea"/>
                        <button onClick={handleAnswerSubmit} className="submit-btn">답글 등록</button>
                    </div>
                )
            )}
        </div>
    );
};

export default QnaDetails;
