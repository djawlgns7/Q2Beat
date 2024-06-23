package org.bit.model.quiz;

import lombok.Data;

@Data
public class QuizListening {
    private int listening_id;
    private String listening_url;
    private String listening_answer;

    // 기본 생성자 추가
    public QuizListening() {
        this.listening_id = 0;
        this.listening_url = "";
        this.listening_answer = "";
    }
}
