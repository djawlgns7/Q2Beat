import {useState} from "react";
import notice from "./Notice.jsx";
import {useNavigate} from "react-router-dom";


const notices = [
    {id:1, title: "테스트 입니다. 테스트 공지사항이니 확인하지 마십시오", date: "2024-06-18", author:"관리자"},
    {id:2, title: "테스트 입니다. 테스트 공지사항이니 확인하지 마십시오", date: "2024-06-17", author:"사용자"},
    {id:3, title: "테스트 입니다. 새로운 공지사항이니 확인하지 마십시오", date: "2024-06-16", author:"관리자"},
];

const NoticeBoard = () => {
    const navigate = useNavigate();

    const [noticeList, setNoticeList] = useState([]);
    const [pageList, setPageList] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [prevPage, setPrevPage] = useState(0);
    const [nextPage, setNextPage] = useState(0);
    const [endPage, setEndPage] = useState(0);

    const getNoticeBoard = async () => {

    }

    return (
        <div className="notice-board">
            <h1> 공지사항 </h1>
            <table>
                <thead>
                <tr>
                    <th>제목</th>
                    <th>날짜</th>
                    <th>작성자</th>
                </tr>
                </thead>
                <tbody>
                {currentNotices.map((notice) => (
                    <tr key = {notice.id}>
                        <td>{notice.title}</td>
                        <td>{notice.date}</td>
                        <td>{notice.author}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    &lt; 이전
                </button>
                {pageNumbers.map((number) => (
                    <button key = {number} onClick={() => setCurrentPage(number)}>
                        {number}
                    </button>
                ))}
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
                    다음 &gt;
                </button>
            </div>
        </div>
    );
};

export default NoticeBoard;