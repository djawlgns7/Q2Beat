import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQna } from "../../controller/qnaController.js";
import '../../css/Qna/QnaWrite.css';

const QnaWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async () => {
        const qna = {
            member_username: 'user3', // 실제 사용자 이름으로 대체
            qna_title: title,
            qna_content: content,
            qna_date: new Date().toISOString(),
            status: 'UNANSWERED'
        };
        try {
            await createQna(qna);
            navigate('/qna');
        } catch (error) {
            console.error('Error createQnA',error);
        }
    };

    const handlePopupSubmit = () => {
        const confirmed = window.confirm("정말 게시글 작성을 하시겠습니까?");
        if (confirmed) {
            handleSubmit();
        }
    };

    return (
        <div className="qna-write">
            <h2>QnA 질문</h2>
            <div>
                <label htmlFor="title">제목:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                <label htmlFor="content">내용:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                ></textarea>
            </div>
            <button onClick={handlePopupSubmit}>질문 작성</button>
        </div>
    );
};

export default QnaWrite;
