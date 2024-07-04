import axios from 'axios';

//공지사항 목록조회(페이지네이션)
export const getNotices = async (page = 1, size = 5) => {
    try{
        const response = await axios.get(`http://localhost:8080/api/notices?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error('게시글 목록 에러',error);
        throw error; //오류를 다시 던져서 상위에서 처리
    }
};
//공지사항 조회
export const getNoticeById = async (notice_id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/notices/${notice_id}`);
        return response.data;
    } catch (error) {
        console.error('게시글 번호 조회 에러',error);
        throw error;
    }
};
//공지사항 추가
export const createNotice = async (notice) => {
    console.log("notice: ", notice)
    try{
        const response = await axios.post('http://localhost:8080/api/notices/create', notice,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error){
        console.error('공지사항 추가 에러',error);
        throw error;
    }
};
//공지사항 수정
export const updateNotice = async (notice, notice_id) => {
    try{
        const response = await axios.put(`http://localhost:8080/api/notices/${notice_id}`, notice, {
            withCredentials: true, //세션쿠키를 포함하여 요청을 보냄
        });
        if(response.status !== 200) {
            throw new Error('공지사항 수정 실패');
        }
    } catch (error){
        console.error('공지사항 수정 에러',error);
        throw error;
    }
};
//공지사항 삭제
export const deleteNotice = async (notice_id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/notices/${notice_id}`);
        return response.data;
    } catch (error){
        console.error('공지사항 삭제 에러',error);
        throw error;
    }
};
