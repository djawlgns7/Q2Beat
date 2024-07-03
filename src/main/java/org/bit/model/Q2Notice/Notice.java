package org.bit.model.Q2Notice;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class Notice {
    private int notice_id;          //공지사항 글번호
    private String admin_username;  //작성자 ID
    private String title;           //제목
    private String content;         //내용

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY-MM-DD", timezone = "Asia/Seoul")//날짜변환 추출
    private LocalDate create_date; //작성일
}
