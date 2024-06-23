import axios from 'axios';

export const fetchQnaList = async (page, size, setQna, setPagination) => {
    try {
        const response = await axios.get(`/api/qna?page=${page}&size=${size}`);
        setQna(response.data.qna);
        setPagination((prev) => ({
            ...prev,
            totalPages: response.data.pagination.totalPages,
            startPage: response.data.pagination.startPage,
            endPage: response.data.pagination.endPage,
        }));
    } catch (error) {
        console.error('QnA 목록 에러:', error);
    }
};

export const fetchQnaDetail = async (qna_id, setQna) => {
    try {
        const response = await axios.get(`/api/qna/${qna_id}`);
        setQna(response.data);
    } catch (error) {
        console.error('QnA 상세 에러:', error);
    }
};

export const createQna = async (qnaData) => {
    try {
        await axios.post('/api/qna', qnaData);
    } catch (error) {
        console.error('QnA 등록 에러:', error);
    }
};

export const updateQna = async (qna_id, qnaData) => {
    try {
        await axios.put(`/api/qna/${qna_id}`, qnaData);
    } catch (error) {
        console.error('QnA 수정 에러:', error);
    }
};

export const deleteQna = async (qna_id) => {
    try {
        await axios.delete(`/api/qna/${qna_id}`);
    } catch (error) {
        console.error('QnA 삭제 에러:', error);
    }
};


