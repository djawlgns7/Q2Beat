package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.Player;
import org.bit.model.QuizHistory;
import org.bit.model.quiz.QuizPose;
import org.bit.model.quiz.TongueTwister;
import org.bit.service.PlayerService;
import org.bit.service.PoseService;
import org.bit.service.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
public class PoseController {

    private final PoseService poseService;
    private final RoomService roomService;
    private final PlayerService playerService;

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

    @PostMapping("/pose/image/upload")
    public void uploadImage(@RequestParam("image") MultipartFile file, @RequestParam("roomId") String roomId,
                                              @RequestParam("playerName") String playerName) throws IOException {
        Player player = new Player();
        player.setPlayer_image(file.getBytes());
        player.setPlayer_name(playerName);
        player.setRoom_id(roomId);
        playerService.updatePlayerImage(player);
    }

    @GetMapping("/pose/image/get")
    public ResponseEntity<String> getImage(@RequestParam("roomId") String roomId, @RequestParam("playerName") String playerName) {
        try {
            byte[] image = playerService.getPlayerImage(roomId, playerName);
            if (image == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
            }
            String encodedImage = java.util.Base64.getEncoder().encodeToString(image);
            return ResponseEntity.ok().body(encodedImage);
        } catch (Exception e) {
            e.printStackTrace(); // 전체 스택 트레이스 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching image: " + e.getMessage());
        }
    }

}
