package org.bit.model.quiz;

import lombok.Data;

@Data
public class QuizListening {
    private int listening_id;
    private String listening_url;
    private String listening_answer;
    private int category;
}
