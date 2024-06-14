package org.bit.service;

import lombok.Data;
import org.bit.mapper.QuizMapper;
import org.bit.model.quiz.QuizNormal;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
public class QuizService {
    private final QuizMapper quizMapper;

    public QuizNormal getQuizNormal(int normal_id) {
        return quizMapper.getQuizNormal(normal_id);
    }

    public List<String> getNormalCategoryNameList() {
        return quizMapper.getNormalCategoryNameList();
    }

    public List<Integer> getNormalQuizNumberList(String category) {
        return quizMapper.getNormalQuizNumberList(category);
    }

}
