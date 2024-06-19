package org.bit.model.Q2Notice;

import lombok.Data;

@Data
public class Qna {
    private Long qna_id;
    private String question;
    private String answer;
    private String created_at;
}
