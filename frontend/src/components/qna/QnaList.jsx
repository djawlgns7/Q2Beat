import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import '../../css/Qna/QnaList.css';
import { getQnaList } from "../../controller/qnaController.js";

const QnaList = ({ isAdmin }) => {
    const [qnaList, setQnaList] = useState([
        {qna_id: 60, qna_title: '테스트 질문 1', status: 'UNANSWERED', qna_date: '2024-07-03 11:11:00', member_username:'testman1'},
        {qna_id: 70, qna_title: '테스트 질문 2', status: 'ANSWERED', qna_date: '2024-07-03 13:15:00', member_username:'testman2'},
        {qna_id: 80, qna_title: '테스트 질문 3', status: 'UNANSWERED', qna_date: '2024-07-03 17:15:00', member_username:'testman3'}
    ]);
    const [pagination, setPagination] = useState({
        currentPage: 1, //현재 페이지
        totalPages: 1,  //전체 페이지 수
        pageSize: 5,    //한 페이지에 표시할 항목 수
        startPage: 1,   //현재 페이지 블록에서 시작 페이지
        endPage:1,      //현재 페이지 블록에서 끝 페이지
        totalCount:0,   //전체 항목 수
    });

    const navigate = useNavigate();

    //컴포넌트가 처음 랜더링되고 현재페이지가 변경될 때 fetchQna 호출
    useEffect(() => {
        fetchQna(pagination.currentPage, pagination.pageSize);
    }, [pagination.currentPage, pagination.pageSize]);

    //목록을 서버에서 가져오는 비동기 함수
    const fetchQna = async (page, size) => {
        try {
            const response = await getQnaList(page, size);
            console.log('응답 데이터:', response);
            //서버로 부터 받은 데이터를 상태에 설정
            setQnaList(response.qna);
            setPagination(prev => ({
                ...prev,
                currentPage: page,
                totalPages: response.pagination.totalPages,
                startPage: response.pagination.startPage,
                endPage: response.pagination.endPage,
                totalCount: response.pagination.totalCount,
            }));
        } catch (error) {
            console.error('QnA 목록 에러:', error);
        }
    };

    //페이지 변경 함수(현재 페이지)
    const handlePageChange = (page) => {
        setPagination(prev => ({
            ...prev,
            currentPage: page
        }));
    };

    //다음 페이지 블록으로 이동하는 함수
    const handleNextBlock = () => {
        if (pagination.endPage < pagination.totalPages) {
            setPagination(prev =>({
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

    const handleHideQna = async (qna_id) => {
        try {
            await hideQna(qna_id);
            setQnaList(qnaList.map(qna => qna.qna_id === qna_id ? { ...qna, qna_title: '숨김 처리 된 질문입니다.' } : qna));
        } catch (error) {
            console.error('QnA 가림 에러:', error);
        }
    };

    const handleUnHideQna = async (qna_id) => {
        try {
            await unHideQna(qna_id);
            setQnaList(qnaList.map(qna => qna.qna_id === qna_id ? { ...qna, status: 'UNANSWERED' } : qna)); // 상태를 적절히 설정
        } catch (error) {
            console.error('QnA 가림 해제 에러:', error);
        }
    };
    //관리자 상태체크
    console.log("isAdmin", isAdmin);

    return (
        <div className="qna-container">
            <h1>QnA 목록</h1>
            <table className="qna-table">
                <thead>
                <tr>
                    <th className="th-qna-id">순번</th>
                    <th className="th-qna-title" style={{cursor: "pointer"}}>질문 제목</th>
                    <th className="th-qna-status">상태</th>
                    <th className="th-qna-date">날짜</th>
                    <th className="th-qna-writer">작성자</th>
                    {isAdmin && <th>관리자</th>}
                </tr>
                </thead>
                <tbody>
                {qnaList.map((qna, index) => (
                    <tr key={qna.qna_id}>
                        <td>{getDisplayNumber(index)}</td>
                        <td>
                            <Link to={`/qna/${qna.qna_id}`}>
                                {qna.qna_title}
                            </Link>
                        </td>
                        <td>{qna.status === 'UNANSWERED' ? '답변 중' : '답변완료'}</td>
                        <td>{qna.qna_date}</td>
                        <td>{qna.member_username}</td>
                        {isAdmin && (
                            <td>
                                <button className="hide-btn"
                                        onClick={() => handleHideQna(qna.qna_id)}>숨김
                                </button>
                                <button className="unhide-btn"
                                        onClick={() => handleUnHideQna(qna.qna_id)}>숨김해제
                                </button>
                            </td>
                        )}
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
                <button className="write-btn" onClick={() => navigate(`/qna/qnaCreate`)}>글 작성</button>
            </div>
        </div>
    );
};

export default QnaList;