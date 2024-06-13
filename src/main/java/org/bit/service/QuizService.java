package org.bit.service;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.QuizMapper;
import org.bit.model.QuizNormal;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class QuizService {
    private final QuizMapper quizMapper;

    public QuizNormal getQuizNormal(int normal_id) {
        return quizMapper.getQuizNormal(normal_id);
    }


}
