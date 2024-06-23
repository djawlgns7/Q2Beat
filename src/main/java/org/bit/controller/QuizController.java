package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.handler.MyWebSocketHandler;
import org.bit.model.Player;
import org.bit.model.QuizHistory;
import org.bit.model.quiz.PlayerAnswer;
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
    private final MyWebSocketHandler myWebSocketHandler;

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
        int result = quizService.gradingNormal(quizId, Integer.parseInt(player.getPlayer_recent_answer()));

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

        String formattedRoomId = roomId.startsWith("R") ? roomId : "R" + roomId;

        List<Integer> quizIds = quizService.getListeningQuizNumberList();
        QuizHistory quizHistory = new QuizHistory();
        quizHistory.setRoom_id(formattedRoomId);

        System.out.println("Quiz IDs: " + quizIds);
        System.out.println("Quiz History: " + quizHistory);

        int quizNumber = quizIds.size();

        while (true) {
            int randomIndex = (int) (Math.random() * quizNumber);
            int quizId = quizIds.get(randomIndex);
            quizHistory.setQuiz_id(quizId);

            try {
                if (roomService.insertQuizHistory(quizHistory)) {
                    System.out.println("quizId: " + quizId);
                    QuizListening quizListening = quizService.getQuizListening(quizId);

                    if (quizListening == null) {
                        System.out.println("Failed to retrieve QuizListening for quizId: " + quizId);
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                    }

                    System.out.println(quizListening);
                    return ResponseEntity.ok(quizListening);
                }
            } catch (Exception e) {
                System.err.println("Failed to insert quiz history: " + e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @GetMapping("/send/answer/listening")
    public ResponseEntity<Player> checkListeningAnswer(@RequestParam("quizId") int quizId,
                                                       @RequestParam("roomId") String roomId,
                                                       @RequestParam("playerName") String playerName,
                                                       @RequestParam("answer") String answer) {
        System.out.println("Received Parameters - quizId: " + quizId + ", roomId: " + roomId + ", playerName: " + playerName + ", answer: " + answer);

        // formattedRoomId 변수로 roomId를 'R'로 시작하도록 수정
        String formattedRoomId = roomId.startsWith("R") ? roomId : "R" + roomId;

        Player player = playerService.getPlayerByRoomAndName(formattedRoomId, playerName);
        if (player == null) {
            System.out.println("Player not found - roomId: " + formattedRoomId + ", playerName: " + playerName);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Player not found");
        }

        int result = quizService.gradingListening(quizId, answer);

        System.out.println("Grading Result: " + result);

        player.setPlayer_recent_answer(answer);
        playerService.updatePlayerRecentAnswerForListening(player.getPlayer_recent_answer(), player.getRoom_id(), player.getPlayer_name());
        player.setCorrect(false);

        if (result == 1) {
            player.setPlayer_score(player.getPlayer_score() + 1);
            player.setCorrect(true);
            playerService.updatePlayerScoreForListening(player.getPlayer_score(), player.getRoom_id(), player.getPlayer_name());

            // 라운드 종료 메시지 전송
            try {
                System.out.println("라운드 종료");
                myWebSocketHandler.sendMessageToRoom(formattedRoomId, "ROUNDEND");
            } catch (Exception e) {
                System.out.println("Failed to send message to room: " + e.getMessage());
            }

            System.out.println("Player Info - Name: " + player.getPlayer_name() + ", Score: " + player.getPlayer_score() + ", Correct: " + player.isCorrect());
            return ResponseEntity.ok(player);
        }

        // 모든 답안이 제출되었는지 확인
        List<Player> players = playerService.getPlayerList(formattedRoomId);
        boolean allAnswered = players.stream().allMatch(p -> p.getPlayer_recent_answer() != null);
        if (allAnswered) {
            try {
                myWebSocketHandler.sendMessageToRoom(formattedRoomId, "ROUNDEND");
            } catch (Exception e) {
                System.out.println("Failed to send message to room: " + e.getMessage());
            }
        }

        System.out.println("Player Info - Name: " + player.getPlayer_name() + ", Score: " + player.getPlayer_score() + ", Correct: " + player.isCorrect());
        return ResponseEntity.ok(player);
    }


    @GetMapping("/get/round/result/listening")
    public ResponseEntity<Map<String, Object>> getListeningAnswer(@RequestParam("roomId") String roomId) {
        System.out.println("Received roomId: " + roomId);

        String formattedRoomId = roomId.startsWith("R") ? roomId : "R" + roomId;
        List<Player> players = playerService.getPlayerList(formattedRoomId);
        String correctAnswer = players.stream()
                .filter(Player::isCorrect)
                .findFirst()
                .map(Player::getPlayer_recent_answer)
                .orElse("정답자 없음");

        Map<String, Object> response = new HashMap<>();
        response.put("correctAnswer", correctAnswer);
        response.put("players", players);

        return ResponseEntity.ok(response);
    }
}