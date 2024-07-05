import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../css/Notice/NoticeList.css';
import { getNotices } from '../../controller/noticeController.js';

//공지사항 목록
const NoticeList = ({ isAdmin }) => {
    const [notices, setNotices] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1, //현재 페이지
        totalPages: 1,  //전체 페이지 수
        pageSize: 5,    //한 페이지에 표시할 항목 수
        startPage: 1,   //현재 페이지 블록에서 시작 페이지
        endPage:1,      //현재 페이지 블록에서 끝 페이지
        totalCount:0,   //전체 항목 수
    });
    //관리자 상태체크
    console.log("isAdmin", isAdmin);

    const navigate = useNavigate();

    //컴포넌트가 처음 랜더링되고 현재페이지가 변경될 때 fetchNotices 호출
    useEffect(() => {
        fetchNotices(pagination.currentPage, pagination.pageSize);
    }, [pagination.currentPage, pagination.pageSize]);

    //공지사항 목록을 서버에서 가져오는 비동기 함수
    const fetchNotices = async (page, size) => {
        try {
            const response = await getNotices(page, size);
            console.log('응답 데이터:', response);
            //서버로 부터 받은 데이터를 상태에 설정

            setNotices(response.notices);
            setPagination(prev => ({
                ...prev,
                totalPages: response.pagination.totalPages,
                startPage: response.pagination.startPage,
                endPage: response.pagination.endPage,
                totalCount: response.pagination.totalPages,
            }));
        } catch (error) {
            console.error('공지사항 목록 에러:', error);
        }
    };
    //페이지 변경 함수
    const handlePageChange = (page) => {
        setPagination(prev => ({
            ...prev,
            currentPage: page
        }));
    };

    //다음 페이지 블록으로 이동하는 함수
    const handleNextBlock = () => {
        if (pagination.endPage < pagination.totalPages) {
            setPagination(prev => ({
                ...prev,
                currentPage: pagination.endPage + 1
            }));
        }
    };

    //이전 페이지 블록으로 이동하는 함수
    const handlePrevBlock = () => {
        if (pagination.startPage > 1) {
            setPagination(prev => ({
                ...prev,
                currentPage: pagination.startPage - 1
            }));
        }
    };

    //현재 페이지와 페이지 크기를 기반으로 항목 번호(글번호)를 계산하는 함수
    const getDisplayNumber = (index) => {
        return (pagination.currentPage - 1) * pagination.pageSize + index + 1;
    };

    const goToPreviousPage = () => {
        navigate('/'); // 이전 페이지로 이동
    };

    return (
        <div className="notice-container">
            <div className="notice-header">
                <h1 className="notice-title">공지사항</h1>
                <button className="notice-back-btn" onClick={goToPreviousPage}>나가기</button>
            </div>
            <table className="notice-table">
                <thead>
                <tr>
                    <th className="th-nt-id">No</th>
                    <th className="th-nt-title">제목</th>
                    <th className="th-nt-date">날짜</th>
                    <th className="th-nt-author">글쓴이</th>
                </tr>
                </thead>

                <tbody>
                {notices.map((notice, index) => (
                    <tr key={notice.notice_id}>
                        <td className="td-nt-id">{getDisplayNumber(index)}</td>
                        <td className="td-nt-title">
                            <Link to={`/notices/${notice.notice_id}`}>
                                {notice.title}
                            </Link>
                        </td>
                        <td className="td-nt-date">{notice.create_date}</td>
                        <td className="td-nt-author">관리자</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="notice-footer">
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
                {isAdmin && <button className="write-btn" onClick={() => navigate(`/notices/create`)}>글쓰기</button>}
            </div>
        </div>
    );
};

export default NoticeList;