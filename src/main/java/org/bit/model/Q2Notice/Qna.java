package org.bit.model.Q2Notice;

import lombok.Data;

@Data
public class Qna {
    private int qna_id;             //QnA 글 번호
    private String member_username; //회원 아이디
    private String admin_username;  //관리자 아이디
    private String qna_title;       //QnA 제목
    private String qna_content;     //QnA 내용

    private String qna_date; //QnA 게시글 등록 날짜
    private String answer_content;  //QnA 관리자 답글

    private String answer_date;  //QnA 답글 등록 날짜
    private QnaStatus status = QnaStatus.UNANSWERED; //기본 상태 설정값

    //상태: QnA 작성자 상태를('일반사용자','관리자','비밀글(SECRET)','가림처리(HIDDEN)')
    public enum QnaStatus {
        UNANSWERED, ANSWERED, SECRET, HIDDEN
    }
}
