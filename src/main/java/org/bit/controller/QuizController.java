package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.QuizNormal;
import org.bit.service.QuizService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/information")
    public QuizNormal information(@RequestParam("quizId") int quizId) {
        return quizService.getQuizNormal(quizId);
    }
}
