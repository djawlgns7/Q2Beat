import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQna } from '../../controller/qnaController.js';
import '../../css/Qna/QnaWrite.css';

const QnaWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isMode, setIsMode] = useState('UNANSWERED');
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSecretChanger = (e) => {
        setIsMode(e.target.value);
    }

    //이전 페이지로 이동하는 함수
    const goToPreviousPage = () => {
        navigate('/qna'); // 목록 페이지로 이동
    };

    const handleSubmit = async () => {
        const qna = {
            member_username: JSON.parse(sessionStorage.getItem('member')).memberUsername, // 실제 사용자 이름으로 대체
            qna_title: isMode === 'SECRET' ? '비밀 질문입니다.' : title,
            qna_content: content,
            qna_date: new Date().toISOString(),
            status: isMode
        };
        try {
            await createQna(qna);
            navigate('/qna'); //질문 등록하면 Q&A 목록으로
        } catch (error) {
            console.error('Error createQnA', error);
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
            <button className="back-btn" onClick={goToPreviousPage}>목록</button>
            <div>
                <label htmlFor="title">제목:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="qna-content-form"
                />
            </div>
            <div>
                <label htmlFor="content">내용:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                    className="qna-text-form"
                ></textarea>
            </div>
            <div>
                <label htmlFor="secret">공개여부 </label>
                <select
                    id="secret"
                    value={isMode}
                    onChange={handleSecretChanger}
                    className="qna-select-form"
                >
                    <option value="UNANSWERED">공개</option>
                    <option value="SECRET">비공개</option>
                </select>
            </div>
            <button onClick={handlePopupSubmit}>질문 작성</button>
        </div>
    );
};

export default QnaWrite;
