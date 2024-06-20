import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/Board/Notice.css';

const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        pageSize: 5,
        startPage: 1,
        endPage:1
    });

    useEffect(() => {
        fetchNotices(pagination.currentPage, pagination.pageSize);
    }, [pagination.currentPage]);

    const fetchNotices = async (page, size) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/notices?page=${page}&size=${size}`);
            console.log('응답 데이터:', response.data);
            setNotices(response.data.notices);
            setPagination({
                ...pagination,
                totalPages: response.data.pagination.totalPages,
                startPage: response.data.pagination.startPage,
                endPage: response.data.pagination.endPage
            });
        } catch (error) {
            console.error('공지사항 목록 에러:', error);
        }
    };

    const handlePageChange = (page) => {
        setPagination({
            ...pagination,
            currentPage: page
        });
    };

    //다음 페이지
    const handleNextBlock = () => {
        if (pagination.endPage < pagination.totalPages) {
            setPagination({
                ...pagination,
                currentPage: pagination.endPage + 1
            });
        }
    };

    //이전 페이지
    const handlePrevBlock = () => {
        if (pagination.startPage > 1) {
            setPagination({
                ...pagination,
                currentPage: pagination.startPage - 1
            });
        }
    };

    //글번호 순서
    const getDisplayNumber = (index) => {
        return (pagination.currentPage - 1) * pagination.pageSize + index + 1;
    };

    return (
        <div className="notice-container">
            <h1>공지사항</h1>
            <table className="notice-table">
                <thead>
                <tr>
                    <th></th>
                    <th>제목</th>
                    <th>날짜</th>
                    <th>작성자</th>
                </tr>
                </thead>
                <tbody>
                {notices.map((notice, index) => (
                    <tr key={notice.notice_id}>
                        <td>{getDisplayNumber(index)}</td>
                        <td>
                            <Link to={`/notices/${notice.notice_id}`}>
                                {notice.title}
                            </Link>
                        </td>
                        <td>{notice.create_date}</td>
                        <td>{notice.member_id}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => handlePageChange(1)}
                        disabled={pagination.currentPage === 1}>&laquo;</button>
                <button onClick={handlePrevBlock}
                        disabled={pagination.startPage === 1}>&lt;</button>
                {Array.from({length: pagination.endPage - pagination.startPage + 1}, (_, i) => (
                    <button key={pagination.startPage + i}
                            className={pagination.currentPage === pagination.startPage + i ? 'active' : ''}
                            onClick={() => handlePageChange(pagination.startPage + i)}>
                        {pagination.startPage + i}
                    </button>
                ))}
                <button onClick={handleNextBlock}
                        disabled={pagination.endPage === pagination.totalPages}>&gt;</button>
                <button onClick={() => handlePageChange(pagination.totalPages)}
                        disabled={pagination.currentPage === pagination.totalPages}>&raquo;</button>
            </div>
        </div>
    );
};

export default Notice;