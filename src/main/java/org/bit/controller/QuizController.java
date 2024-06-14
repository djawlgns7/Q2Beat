package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.QuizHistory;
import org.bit.model.quiz.QuizNormal;
import org.bit.model.RoomInformation;
import org.bit.service.QuizService;
import org.bit.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;
    private final RoomService roomService;

    @GetMapping("/information")
    public QuizNormal information(@RequestParam("quizId") int quizId) {
        return quizService.getQuizNormal(quizId);
    }

    @GetMapping("/getQuizNormal")
    public QuizNormal getQuiz(@RequestParam("category") String category, @RequestParam("roomId") int roomId) {
        List<Integer> quizIds = quizService.getNormalQuizNumberList(category);
        QuizHistory quizHistory = new QuizHistory();
        quizHistory.setRoom_id("R" + roomId);

        int quizNumber = quizIds.size();

        while (true) {
            int randomIndex = (int) (Math.random() * quizNumber);
            int quizId = quizIds.get(randomIndex);
            quizHistory.setQuiz_id(quizId);

            if (roomService.insertQuizHistory(quizHistory)) {
                System.out.println("quizId: " + quizId);
                System.out.println(quizService.getQuizNormal(quizId));
                return quizService.getQuizNormal(quizId);
            }
        }
    }
}
