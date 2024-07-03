import axios from 'axios';

//QnaList 목록조회
export const getQnaList = async (page =1, size = 5) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/qna?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error('QnA 목록 에러:', error);
        throw error;
    }
};
//QnaList 번호 조회
export const getQnaId = async (qna_id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/qna/${qna_id}`);
        return response.data;
    } catch(error) {
        console.error('error : getQnaId', error);
        throw error;
    }
}

//QnaList 추가
export const createQna = async (qna) => {
    console.log("QnA: create", qna)
    try {
        const response = await axios.post(`http://localhost:8080/api/qna/qnaCreate`, qna);
        console.log('에러: QnA추가', response.data);
        return response.data;
    } catch (error) {
        console.error('에러: QnA추가:', error);
        throw error;
    }
};

//QnaList 수정
export const updateQna = async (qna_id, qna) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/qna/${qna_id}`, qna);
        console.log('에러: QnA수정', qna)
        return response.data;
    } catch (error) {
        console.error('에러: QnA수정', error);
        throw error;
    }
};

//QnaList 삭제
export const deleteQna = async (qna_id) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/qna/${qna_id}`);
        return response.data;
    } catch (error) {
        console.error('QnA 삭제 에러:', error);
        throw error;
    }
};

//QnaList 관리자 답글
export const insertAnswer = async (qna) => {
    console.log("QnA: insertAnswer", qna)
    try {
        const response = await axios.post(`http://localhost:8080/api/qna/answer`, qna);
        return response.data;
    } catch (error) {
        console.error('에러: QnA 관리자 답글', error);
        throw error;
    }
};

//QnaList 게시글 비밀 처리
export const markAsSecret = async (qna_id) => {
    try {
        const response = await axios.patch(`http://localhost:8080/api/qna/secret/${qna_id}`);
        return response.data;
    } catch(error) {
        console.error('에러: QnA 비밀글', error);
        throw error;
    }
};

//QnaList 관리자 가림 처리
export const hideQna = async (qna_id) => {
    try{
        const response = await axios.patch(`http://localhost:8080/api/qna/hide/${qna_id}`);
        return response.data;
    } catch (error) {
        console.error('에러: QnA 숨기기',error);
        throw error;
    }
};

//QnaList 관리자 가림 해제
export const unHideQna = async (qna_id) => {
    try{
        const response = await axios.patch(`http://localhost:8080/api/qna/unhide/${qna_id}`);
        return response.data;
    } catch (error) {
        console.error('에러: QnA 숨김해제',error);
        throw error;
    }
};
