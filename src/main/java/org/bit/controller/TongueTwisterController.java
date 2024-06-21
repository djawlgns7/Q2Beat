package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.QuizHistory;
import org.bit.model.quiz.TongueTwister;
import org.bit.service.RoomService;
import org.bit.service.TongueTwisterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
public class TongueTwisterController {

    private final TongueTwisterService tongueTwisterService;
    private final RoomService roomService;

    @GetMapping("/twister/get")
    public TongueTwister getQuizNormal(@RequestParam("roomId") int roomId) {
        List<Integer> quizIds = tongueTwisterService.getTongueTwisterIdList();
        QuizHistory quizHistory = new QuizHistory();
        quizHistory.setRoom_id("R" + roomId);

        int quizNumber = quizIds.size();

        while (true) {
            int randomIndex = (int) (Math.random() * quizNumber);
            int quizId = quizIds.get(randomIndex);
            quizHistory.setQuiz_id(quizId);

            if (roomService.insertQuizHistory(quizHistory)) {
                System.out.println("quizId: " + quizId);
                return tongueTwisterService.getTongueTwister(quizId);
            }
        }
    }
}
