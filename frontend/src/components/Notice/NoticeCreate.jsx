import React, {useEffect, useState} from "react";
import {createNotice} from "../../controller/noticeController.js";
import {useNavigate} from "react-router-dom";

const NoticeCreate = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState(''); //작성자 정보

    useEffect(() => {
        const adminData = JSON.parse(sessionStorage.getItem('admin'));
        if(adminData) {
            setAuthor(adminData.admin_username);
        }
    }, []);

    const handleWrite = (e) => {
        const {name, value} = e.target;
        if(name === 'title') setTitle(value);
        if(name === 'content') setContent(value);
    };

    const handleInsert = async (e) => {
        e.preventDefault();
        const noticeData = {title, content, admin_username: author};
        try {
            await createNotice(noticeData);
            navigate('/notices');
        } catch(error) {
            console.error('공지사항 추가 에러', error);
        }
    };

    const goToPreviousPage = () => {
        navigate('/notices'); // 목록 페이지로 이동
    };

    return (
        <div className="notice-create">
            <div>
                <button className="back-btn" onClick={goToPreviousPage}>목록</button>
            </div>
            <div><h2>공지사항 추가</h2></div>
            <div className="notice-create-form">
                <form onSubmit={handleInsert}>
                    <div className="notice-info-title">
                        <label>제목:</label>
                        <input type="text" name="title" value={title} onChange={handleWrite} required/>
                    </div>
                    <div className="notice-info-content">
                        <label>내용:</label>
                        <textarea name="content" value={content} onChange={handleWrite} required/>
                    </div>
                    <button type="submit">작성</button>
                </form>
            </div>
        </div>
    );
};

export default NoticeCreate;