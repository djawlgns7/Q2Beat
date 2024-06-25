import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NoticeDetail = () => {
    const { noticeId } = useParams();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        fetchNotice();
    }, [noticeId]);

    const fetchNotice = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/notices/${noticeId}`);
            console.log("데이터 응답:",response.data);
            setNotice(response.data);
        } catch (error) {
            console.error('공지사항 상세보기 에러:', error);
        }
    };

    if (!notice) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <h1>{notice.title}</h1>
            <p>작성자: {notice.memberId}</p>
            <p>작성일: {new Date(notice.createDate).toLocaleDateString()}</p>
            <div>
                <p>{notice.content}</p>
            </div>
        </div>
    );
};

export default NoticeDetail;
