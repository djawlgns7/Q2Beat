package org.bit.model.Q2Notice;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Notice {
    private int notice_id;      //공지사항 글번호
    private int member_id;      //작성자 ID
    private String title;       //제목
    private String content;     //내용
    private String create_date; //작성일
}
