package org.bit.model;

import lombok.Data;

@Data
public class QuizNormal {
    private int normal_id;
    private String normal_quiz;
    private String normal_first_choice;
    private String normal_second_choice;
    private String normal_third_choice;
    private String normal_fourth_choice;
    private int normal_answer;
}
