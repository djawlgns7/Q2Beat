package org.bit.model.Q2Notice;

import lombok.Data;

@Data
public class Qna {
    private int qna_id;         //QnA 글 번호
    private int member_id;      //회원 아이디
    private String qna_title;   //QnA 제목
    private String qna_content; //QnA 내용
    private String qna_date;    //QnA 게시글 등록 날짜
    private String status;      //상태: QnA 글의 상태를(예: 'UNANSWERED' 또는 'ANSWERED')
}
