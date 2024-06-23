package org.bit.service;

import org.bit.mapper.AnswerMapper;
import org.bit.mapper.QnaMapper;
import org.bit.model.Q2Notice.Qna;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class QnaService {

//    @Autowired
//    private AnswerMapper answerMapper;

    @Autowired
    private QnaMapper qnaMapper;

    //작성날짜 문자열 -> 날짜 변환
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    //QnA 게시글 번호 조회
    public Qna getQnaById(int qna_id) {
        Qna qna = qnaMapper.findQnaById(qna_id);
        return qna;
    }
    //QnA 게시글 페이지별로 목록 조회
    public List<Qna> getAllQnaByPage(int page, int size){
        int offset = (page - 1) & size;
        return qnaMapper.selectQnaByPage(offset, size);
    }
    //QnA 전체 게시글 수
    public int getQnaTotalCount(){
        return qnaMapper.countQna();
    }
    //QnA 게시글 등록
    public void addQna(Qna qna) {
        //CURRENT_TIMESTAMP 매핑을 인식하기 위해 생성자를 통해서 현재날짜 변환
        qna.setQna_date(LocalDate.now().format(formatter));
        qnaMapper.insertQna(qna);
    }
    //QnA 게시글 수정
    public void updateQna(Qna qna) {
        //CURRENT_TIMESTAMP 매핑을 인식하기 위해 생성자를 통해서 현재날짜 변환
        qna.setQna_date(LocalDate.now().format(formatter));
        qnaMapper.updateQna(qna);
    }
    //QnA 게시글 삭제
    public void deleteQna(int qna_id) {
        qnaMapper.deleteQna(qna_id);
    }
}
