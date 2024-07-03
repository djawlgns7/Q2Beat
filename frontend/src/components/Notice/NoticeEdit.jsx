import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getNoticeById, updateNotice} from "../../controller/noticeController.js";

//공지사항 수정
const NoticeEdit = () => {
    const { notice_id } = useParams();
    const [ notice, setNotice ] = useState({
        title: '',
        content: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(notice_id) {
            const fetchNotice = async () => {
                const data = await getNoticeById(notice_id);
                setNotice(data);
            };
            fetchNotice();
        }
    }, [notice_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotice({
            ...notice,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
       e.preventDefault();
       if(notice_id) {
           await updateNotice(notice, notice_id);
       }
       navigate('/notices');
    };

    return (
        <div>
            <h1>{notice_id ? '공지사항 작성' : '공지사항 수정'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목:</label>
                    <input type="text" name="title" value={notice.title} onChange={handleChange} />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea name="content" value={notice.content} onChange={handleChange} />
                </div>
                <button type="submit">{notice_id ? '작성' : '수정'}</button>
            </form>
        </div>
    )
}

export default NoticeEdit;