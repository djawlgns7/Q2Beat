import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import '../../css/Qna/Qna.css';

/*
* currentPage 현재 페이지
* totalPages 전체 페이지 수
* pageSize 한 페이지에 표시할 항목 수
* startPage 시작페이지
* endPage 끝페이지
*
* */
const Qna = () => {
    // qna : 질문 답변
    // pagination : 페이지네이션
    const [qna, setQna] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1, //현재 페이지
        totalPages: 1,  //전체 페이지 수
        pageSize: 5,    //한 페이지에 표시할 항목 수
        startPage: 1,   //현재 페이지 블록에서 시작 페이지
        endPage:1       //현재 페이지 블록에서 끝 페이지
    });
    const [addQna, setAddQna ] = useState({
        member_id: '', //로그인한 회원의 ID를 설정
        qna_title: '',
        qna_content: ''
    });

    //컴포넌트가 처음 랜더링되고 현재페이지가 변경될 때 fetchQna 호출
    const [editQna, setEditQna] = useState(null); //수정할 QnA를 관리하는 상태
    useEffect(() => {
        fetchQna(pagination.currentPage, pagination.pageSize);
    }, [pagination.currentPage, pagination.pageSize]);

    //공지사항 목록을 서버에서 가져오는 비동기 함수
    const fetchQna = async (page, size) => {
        try {
            const response = await axios.get(`api/qna?page=${page}&size=${size}`);
            console.log('응답 데이터:', response.data);
            //서버로 부터 받은 데이터를 상태에 설정
            setQna(response.data.qna);
            setPagination(prev => ({
                ...prev,
                totalPages: response.data.pagination.totalPages,
                startPage: response.data.pagination.startPage,
                endPage: response.data.pagination.endPage
            }));
        } catch (error) {
            console.error('공지사항 목록 에러:', error);
        }
    };
    //페이지 변경 함수(현재 페이지)
    const handlePageChange = (page) => {
        setPagination(prev =>({
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

    const handleInputChange = (e) => {
        const [name, value] = e.target;
        setAddQna(prev => ({
            ...prev, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('api/qna', addQna);
            setAddQna({member_id: '', qna_content: '', qna_title: ''});
            fetchQna(pagination.currentPage, pagination.pageSize); // 등록 후 리스트 갱신
        } catch (error) {
            console.error('QnA 등록 에러', error);
        }
    };

    const handleEdit = (qna) => {
        setEditQna(qna);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            await axios.put(`api/qna/${editQna.qna_id}`, editQna);
            setEditQna(null);
            fetchQna(pagination.currentPage, pagination.pageSize); // 수정 후 리스트 갱신
        } catch(error) {
            console.error('QnA 수정 에러', error);
        }
    }

    const handleDelete = async (qna_id) => {
        try {
            await axios.delete(`api/qna/${qna_id}`);
            fetchQna(pagination.currentPage, pagination.pageSize);
        } catch (error){
            console.error('QnA 삭제 에러', error);
        }
    }

    return (
        <div className="qna-container">
            <h1>QnA</h1>
            <table className="qna-table">
                <thead>
                <tr>
                    <th></th>
                    <th>제목</th>
                    <th>날짜</th>
                    <th>작성자</th>
                </tr>
                </thead>
                <tbody>
                {qna.map((qna, index) => (
                    <tr key={qna.qna_id}>
                        <td>{getDisplayNumber(index)}</td>
                        <td>
                            <Link to={`/qna/${qna.qna_id}`}>
                                {qna.qna_title}
                            </Link>
                        </td>
                        <td>{qna.qna_date}</td>
                        <td>{qna.member_id}</td>
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

export default Qna;