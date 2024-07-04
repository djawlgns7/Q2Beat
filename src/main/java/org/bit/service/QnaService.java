package org.bit.service;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.QnaMapper;
import org.bit.model.Q2Notice.Qna;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QnaService {

    private final QnaMapper qnaMapper;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    //QnA 게시글 번호 조회
    public Qna getQnaById(int qna_id) {
        return qnaMapper.findQnaById(qna_id);
    }
    //QnA 게시글 페이지별로 목록 조회
    public List<Qna> getAllQnaByPage(int currentPage, int pageSize){
        int offset = (currentPage - 1) * pageSize;
        return qnaMapper.selectQnaByPage(offset, pageSize);
    }
    //QnA 전체 게시글 수
    public int getQnaTotalCount(){
        return qnaMapper.countQna();
    }
    //QnA 게시글 등록
    public void addQna(Qna qna) {
        if(qna.getStatus() == null || qna.getStatus() == Qna.QnaStatus.HIDDEN) {
            qna.setStatus(Qna.QnaStatus.UNANSWERED); //기본 상태 설정값
        }
        qna.setQna_date(LocalDateTime.now().format(formatter));
        qnaMapper.insertQna(qna);
    }
    //QnA 게시글 수정
    public void updateQna(Qna qna) {
        qnaMapper.updateQna(qna);
    }
    //QnA 게시글 삭제
    public void deleteQna(int qna_id) {
        qnaMapper.deleteQna(qna_id);
    }

    //관리자 QnA 답글 등록
    public void insertAnswer(Qna answer) {
        Qna qna = qnaMapper.findQnaById(answer.getQna_id());
        answer.setAnswer_date(LocalDateTime.now().format(formatter));
        answer.setStatus(Qna.QnaStatus.ANSWERED);
        if(qna.getStatus() == Qna.QnaStatus.SECRET) {
            qna.setQna_title("비밀 질문입니다.");
        }
        qnaMapper.insertAnswer(answer);
    }

    //게시글 비밀글 처리(일반사용자, 관리자)
    public void markAsSecret(int qna_id) {
        qnaMapper.markAsSecret(qna_id);
    }

    //관리자 게시글 가림 처리
    public void hideQna(int qna_id) {
        qnaMapper.hideQna(qna_id);
    }

    //관리자 게시글 가림 해제
    public void unHideQna(int qna_id, Qna.QnaStatus status) {
        qnaMapper.unHideQna(qna_id, status);
    }
}
