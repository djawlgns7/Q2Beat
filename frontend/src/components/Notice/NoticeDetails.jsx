import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {createNotice, deleteNotice, getNoticeById} from '../../controller/noticeController.js';
import '../../css/Notice/NoticeDetails.css';

//공지사항 상세페이지 = 게시글 삭제, 수정
//관리자 상태 => 수정, 삭제 버튼 활성화
const NoticeDetails = ({ isAdmin }) => {
    const { notice_id } = useParams();
    const [notice, setNotice] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const data = await getNoticeById(notice_id);
                setNotice(data);
            } catch(error) {
                console.error('에러 : 공지사항 불러오기', error);
            }
        };
        fetchNotice();
    }, [notice_id]);

    const handleCreate = async () => {
        try {
            await createNotice('');
            navigate('/notices');
        }catch (error) {
            console.error('에러: 공지사항 추가', error);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteNotice(notice_id);
            navigate('/notices');
        } catch (error) {
            console.error('에러 : 공지사항 삭제', error);
        }
    };

    if (!notice) return <div>Loading...</div>;

    return (
        <div className="notice-details-container">
            <h1>{notice.title}</h1>
            <p>{notice.content}</p>
            <p>작성자 : {notice.admin_username}</p>
            <p>작성일 : {notice.create_date}</p>

            { isAdmin && (
                <>
                    <button onClick={() => navigate(`/notices/edit/${notice_id}`)}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </>
            )}
        </div>
    );
};

export default NoticeDetails;
