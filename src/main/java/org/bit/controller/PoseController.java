package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.QuizHistory;
import org.bit.model.quiz.QuizPose;
import org.bit.model.quiz.TongueTwister;
import org.bit.service.PoseService;
import org.bit.service.RoomService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
public class PoseController {

    private final PoseService poseService;
    private final RoomService roomService;

    @GetMapping("/pose/get")
    public QuizPose getQuizPose(@RequestParam("roomId") int roomId, @RequestParam("level") String level) {
        List<Integer> quizIds = poseService.getPoseIdList(level);
        QuizHistory quizHistory = new QuizHistory();
        quizHistory.setRoom_id("R" + roomId);

        int quizNumber = quizIds.size();

        while (true) {
            int randomIndex = (int) (Math.random() * quizNumber);
            int quizId = quizIds.get(randomIndex);
            quizHistory.setQuiz_id(quizId);

            if (roomService.insertQuizHistory(quizHistory)) {
                System.out.println("quizId: " + quizId);
                return poseService.getPose(quizId);
            }
        }
    }

    @GetMapping("/pose/get/quiz")
    public QuizPose getQuizPoseById(@RequestParam("quizId") int quizId) {
        return poseService.getPose(quizId);
    }

}
