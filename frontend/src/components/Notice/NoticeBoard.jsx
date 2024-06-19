import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import '../../css/PC.css'
import '../../css/Board/NoticeBoard.css';
import Q2B_back from "../../image/Q2Beat_background.png";

const NoticeBoard = () => {
    const navigate = useNavigate();

    const [noticeList, setNoticeList] = useState([]);
    const [pageList, setPageList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [nextPage, setNextPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);

    const getNoticeBoard = async (page = 1) => {
        if(page === currentPage) return; //현재 페이지와 누른 페이지가 같으면 return

        try {
            //서버로 부터 게시글 목록 조회
            const response = await axios.get(`http://localhost:8080/api/notices?page=${page}`);
            console.log(response.data.data);

            const { data, pagination} = response.data;
            setNoticeList(data); //게시글 목록을 상태에 저장

            if(pagination){
                const { lastPage, nextPage, prevPage, startPage, totalPageCnt } = pagination;
                setCurrentPage(page);
                setPrevPage(prevPage);
                setNextPage(nextPage);
                setLastPage(totalPageCnt);

                const tmpPages = [];
                for(let i = startPage; i <= lastPage; i++){
                    tmpPages.push(i);
                }

                setPageList(tmpPages);
            }
            else {
                setPageList([]);
                setCurrentPage(1);
                setPrevPage(0);
                setNextPage(0);
                setLastPage(0);
            }
        } catch(error){
            console.log('!!게시판 로그에러!!',error);
            //에러 발생하면 기본값 설정
            setNoticeList([]);
            setPageList([]);
            setCurrentPage(1);
            setPrevPage(0);
            setNextPage(0);
            setLastPage(0);
        }
    };

    const moveToWrite = () => {
        navigate('/write'); //글쓰기 페이지 이동
    };

    const onClick = (event) => {
        let value = parseInt(event.target.value, 10);
        getNoticeBoard(value);
    }

    useEffect(() => {
        getNoticeBoard(); //초기 렌더링 시 게시글 목록 조회
    }, []);

    return (
        <div className="board-container">
            <div className="board-box">
                <h2>공지사항</h2>
                <ul>
                    {noticeList.map((notice) => (
                        <li key={notice.note_id}>
                            <Link to={`/notices/${notice.note_id}`}>{notice.title}</Link>
                        </li>
                    ))}
                </ul>
                <div>
                    <button onClick={onClick} value={1}>
                        &lt;&lt;
                    </button>
                    <button onClick={onClick} value={prevPage}>
                        &lt;
                    </button>
                    {pageList.length > 0 ? (
                        noticeList.map((page, index) => (
                            <button key={index} onClick={onClick} value={page}>
                                {page}
                            </button>
                        ))
                    ) : (
                        <li>공지사항이 없습니다</li>
                    )}
                </div>
                <div>
                    <button onClick={onClick} value={1}>
                        &lt;&lt;
                    </button>
                    <button onClick={onClick} value={prevPage}>
                        &lt;
                    </button>
                    {pageList.map((page, index) => (
                        <button key={index} onClick={onClick} value={page}>
                            {page}
                        </button>
                    ))}
                    <button onClick={onClick} value={nextPage}>
                        &gt;
                    </button>
                    <button onClick={onClick} value={lastPage}>
                        &gt;&gt;
                    </button>
                </div>
            </div>
            <div>
                <button onClick={moveToWrite}>글쓰기</button>
            </div>
            <img src={Q2B_back} alt="Q2B_back" className="backImage-p"/>
        </div>
    );
};

export default NoticeBoard;