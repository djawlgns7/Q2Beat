package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.Player;
import org.bit.model.QuizHistory;
import org.bit.model.quiz.PlayerAnswerNumbers;
import org.bit.model.quiz.QuizListening;
import org.bit.model.quiz.QuizNormal;
import org.bit.service.PlayerService;
import org.bit.service.QuizService;
import org.bit.service.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;
    private final RoomService roomService;
    private final PlayerService playerService;

    @GetMapping("/get/normal")
    public QuizNormal getQuizNormal(@RequestParam("category") String category, @RequestParam("roomId") int roomId) {
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

    @GetMapping("/send/answer/normal")
    public Player checkAnswer(@ModelAttribute Player player, @RequestParam("quizId") int quizId) {
        int result = quizService.gradingNormal(quizId, player.getPlayer_recent_answer());

        playerService.updatePlayerRecentAnswer(player);
        player = playerService.getPlayer(player);
        player.setCorrect(false);

        if (result == 1) {
            player.setPlayer_score(player.getPlayer_score() + 1);
            player.setCorrect(true);

            playerService.updatePlayerScore(player);
        }

        return player;
    }

    @GetMapping("/get/round/result/normal")
    public PlayerAnswerNumbers getAnswerNumbers(@RequestParam("roomId") int roomId) {
        String roomIdString = "R" + roomId;

        PlayerAnswerNumbers playerNumbers = new PlayerAnswerNumbers();

        playerNumbers.setAnswerOne(playerService.getAnswerNumbers(roomIdString, 1));
        playerNumbers.setAnswerTwo(playerService.getAnswerNumbers(roomIdString, 2));
        playerNumbers.setAnswerThree(playerService.getAnswerNumbers(roomIdString, 3));
        playerNumbers.setAnswerFour(playerService.getAnswerNumbers(roomIdString, 4));

        return playerNumbers;
    }

    @GetMapping("/get/players/rank/list")
    public List<Player> getPlayersRankList(@RequestParam("roomId") int roomId) {
        String roomIdString = "R" + roomId;

        List<Player> result = playerService.getPlayerRank(roomIdString);

        int size = result.size();

        if (size < 8) {
            return result;
        } else {
            return result.subList(0, 8);
        }
    }

    @GetMapping("/get/player/rank")
    public int getPlayerRank(@RequestParam("roomId") int roomId, @RequestParam("playerName") String playerName) {
        String roomIdString = "R" + roomId;
        int rank = -1;

        List<Player> playersRank = playerService.getPlayerRank(roomIdString);

        for (int i = 0; i < playersRank.size(); i++) {
            if (playersRank.get(i).getPlayer_name().equals(playerName)) {
                rank = i;
                break;
            }
        }

        return rank;
    }

    @GetMapping("/reset/room")
    public void resetRoom(@RequestParam("roomId") int roomId) {
        String roomIdString = "R" + roomId;

        roomService.clearQuizHistory(roomIdString);
        playerService.resetPlayerInformation(roomIdString);
    }

    @GetMapping("/player/list")
    public List<Player> getPlayersList(@RequestParam("roomId") int roomId) {
        String roomIdString = "R" + roomId;

        return playerService.getPlayerList(roomIdString);
    }

    @GetMapping("/get/listening")
    public ResponseEntity<QuizListening> getQuizListening(@RequestParam("roomId") String roomId) {
        System.out.println("Received roomId: " + roomId);  // roomId 로그 출력

        List<Integer> quizIds = quizService.getAllQuizListeningIds();
        Set<Integer> usedQuizIds = new HashSet<>(quizService.getUsedQuizIds(roomId));
        QuizHistory quizHistory = new QuizHistory();
        quizHistory.setRoom_id(roomId);

        System.out.println("Quiz IDs: " + quizIds);
        System.out.println("Used Quiz IDs: " + usedQuizIds);
        System.out.println("Quiz History: " + quizHistory);

        int quizNumber = quizIds.size();
        if (usedQuizIds.size() >= quizNumber) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No unused quiz available");
        }

        int quizId;
        do {
            int randomIndex = (int) (Math.random() * quizNumber);
            quizId = quizIds.get(randomIndex);
            System.out.println("Selected Quiz ID: " + quizId);  // 선택된 Quiz ID 로그 출력
        } while (usedQuizIds.contains(quizId));

        quizHistory.setQuiz_id(quizId);
        if (!roomService.insertQuizHistory(quizHistory)) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to insert quiz history");
        }

        System.out.println("Inserted Quiz History: " + quizHistory);  // 삽입된 Quiz History 로그 출력

        QuizListening quizListening = quizService.getQuizListening(quizId);
        System.out.println("Quiz Listening: " + quizListening);  // Quiz Listening 로그 출력

        return ResponseEntity.ok(quizListening);
    }


    @PostMapping("/send/answer/listening")
    public Player checkListeningAnswer(@RequestParam("quizId") int quizId,
                                       @RequestParam("roomId") String roomId,
                                       @RequestParam("playerName") String playerName,
                                       @RequestParam("answer") String answer) {
        int result = quizService.gradingListening(quizId, answer);

        Player player = playerService.getPlayer(new Player(roomId, playerName));
        player.setCorrect(false);

        if (result == 1) {
            player.setPlayer_score(player.getPlayer_score() + 1);
            player.setCorrect(true);
            playerService.updatePlayerScore(player);
        }

        return player;
    }

    @GetMapping("/get/round/result/listening")
    public List<Player> getRoundResultListening(@RequestParam("roomId") String roomId) {
        return playerService.getPlayerList(roomId);
    }

}
