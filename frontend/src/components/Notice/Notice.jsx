import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import '../../css/PC.css'
import '../../css/Board/Notice.css';
import backImage from "../../image/background-image.png";

/*
* currentPage 현재 페이지
* totalPages 전체 페이지 수
* pageSize 한 페이지에 표시할 항목 수
* startPage 시작페이지
* endPage 끝페이지
*
* */
const Notice = () => {
    // notices : 공지사항
    // pagination : 페이지네이션
    const [notices, setNotices] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1, //현재 페이지
        totalPages: 1,  //전체 페이지 수
        pageSize: 5,    //한 페이지에 표시할 항목 수
        startPage: 1,   //현재 페이지 블록에서 시작 페이지
        endPage:1       //현재 페이지 블록에서 끝 페이지
    });
    const navigate = useNavigate();

    //컴포넌트가 처음 랜더링되고 현재페이지가 변경될 때 fetchNotices 호출
    useEffect(() => {
        fetchNotices(pagination.currentPage, pagination.pageSize);
    }, [pagination.currentPage]);

    //공지사항 목록을 서버에서 가져오는 비동기 함수
    const fetchNotices = async (page, size) => {
        try {
            const response = await axios.get(`/api/notices?page=${page}&size=${size}`);
            console.log('응답 데이터:', response.data);
            //서버로 부터 받은 데이터를 상태에 설정
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
    //페이지 변경 함수
    const handlePageChange = (page) => {
        setPagination({
            ...pagination,
            currentPage: page
        });
    };

    //다음 페이지 블록으로 이동하는 함수
    const handleNextBlock = () => {
        if (pagination.endPage < pagination.totalPages) {
            setPagination({
                ...pagination,
                currentPage: pagination.endPage + 1
            });
        }
    };

    //이전 페이지 블록으로 이동하는 함수
    const handlePrevBlock = () => {
        if (pagination.startPage > 1) {
            setPagination({
                ...pagination,
                currentPage: pagination.startPage - 1
            });
        }
    };

    //현재 페이지와 페이지 크기를 기반으로 항목 번호(글번호)를 계산하는 함수
    const getDisplayNumber = (index) => {
        return (pagination.currentPage - 1) * pagination.pageSize + index + 1;
    };

    const lobbyPage = () => {
        navigate("/");
    }

    return (
        <div className="container-p">
            <div className="contents-box-p">
                <div className="notice-header">
                    <h1 className="notice-title">공지사항</h1>
                    <button onClick={lobbyPage}>나가기</button>
                </div>
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
            <img src={backImage} alt="backImage" className="backImage-p"/>
        </div>
    );
};

export default Notice;