package org.bit.service;

import lombok.Data;
import org.bit.mapper.QuizMapper;
import org.bit.model.quiz.QuizListening;
import org.bit.model.quiz.QuizNormal;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

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

    public int gradingNormal(int normal_id, int normal_answer) {
        return quizMapper.gradingNormal(normal_id, normal_answer);
    }

    public QuizListening getQuizListening(int listening_id) {
        return quizMapper.getQuizListening(listening_id);
    }

    public List<Integer> getAllQuizListeningIds() {
        return quizMapper.getAllQuizListeningIds();
    }

    public int gradingListening(int listening_id, String listening_answer) {
        return quizMapper.gradingListening(listening_id, listening_answer);
    }

    public List<Integer> getUsedQuizIds(String roomId) {
        return quizMapper.getUsedQuizIds(roomId);
    }

    public List<Integer> getListeningQuizNumberList() {
        return quizMapper.getListeningQuizNumberList();
    }
}
