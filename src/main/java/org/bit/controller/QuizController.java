package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.handler.MyWebSocketHandler;
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
    public Player checkAnswer(@RequestParam("quizId") int quizId,
                              @RequestParam("roomId") String roomId,
                              @RequestParam("playerName") String playerName,
                              @RequestParam("answer") String answer) {
        Player player = new Player(roomId, playerName);
        player.setPlayer_recent_answer(answer);

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

        String formattedRoomId = roomId.startsWith("R") ? roomId : "R" + roomId;

        List<Integer> quizIds = quizService.getListeningQuizNumberList();
        QuizHistory quizHistory = new QuizHistory();
        quizHistory.setRoom_id(formattedRoomId);

        System.out.println("Quiz IDs: " + quizIds);
        System.out.println("Quiz History: " + quizHistory);

        int quizNumber = quizIds.size();
        Set<Integer> usedQuizIds = roomService.getUsedQuizIds(formattedRoomId); // 이미 사용된 quiz_id 목록 가져오기

        while (true) {
            if (usedQuizIds.size() == quizNumber) {
                // 모든 퀴즈가 사용되었을 경우 처리 로직 추가 (예: 중복 허용 또는 오류 반환)
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 예시로 NO_CONTENT 상태 반환
            }

            int randomIndex = (int) (Math.random() * quizNumber);
            int quizId = quizIds.get(randomIndex);

            if (usedQuizIds.contains(quizId)) {
                continue; // 이미 사용된 퀴즈 ID라면 다시 루프
            }

            quizHistory.setQuiz_id(quizId);  // quiz_id 필드에 listening_id 값을 설정

            try {
                if (roomService.insertQuizHistoryForListening(quizHistory)) {
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
                // 예외 발생 시 continue로 다시 시도
            }
        }
    }


    @GetMapping("/send/answer/listening")
    public ResponseEntity<Player> checkListeningAnswer(@RequestParam("quizId") int quizId,
                                                       @RequestParam("roomId") String roomId,
                                                       @RequestParam("playerName") String playerName,
                                                       @RequestParam("answer") String answer) {

        Player player = new Player(roomId, playerName);
        int result = quizService.gradingListening(quizId, answer);

        // 로그 추가
        System.out.println("Grading Result: " + result);
        player.setPlayer_recent_answer(answer);
        playerService.updatePlayerRecentAnswer(player);
        player = playerService.getPlayer(player);

        if (result == 1) {
            // Check if there is already a correct player
            boolean isAlreadyCorrect = playerService.getPlayerList(roomId).stream().anyMatch(Player::isCorrect);

            if (!isAlreadyCorrect) {
                player.setPlayer_score(player.getPlayer_score() + 1);
                player.setCorrect(true);
                playerService.updatePlayerScore(player);
            }
        }

        // 로그 추가
        System.out.println("Player Info - Name: " + player.getPlayer_name() + ", Score: " + player.getPlayer_score() + ", Correct: " + player.isCorrect());

        return ResponseEntity.ok(player);
    }

    @GetMapping("/get/round/result/listening")
    public ResponseEntity<Map<String, Object>> getListeningAnswer(@RequestParam("roomId") String roomId,
                                                                  @RequestParam("correctAnswer") String correctAnswer) {

        String formattedRoomId = roomId.startsWith("R") ? roomId : "R" + roomId;
        List<Player> players = playerService.getPlayerList(formattedRoomId);
        Player correctPlayer = players.stream()
                .filter(player -> correctAnswer.equals(player.getPlayer_recent_answer()))
                .findFirst()
                .orElse(null);

        Map<String, Object> response = new HashMap<>();
        response.put("correctPlayer", correctPlayer);
        response.put("players", players);

        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/player/available", produces = "text/plain;charset=UTF-8")
    public String getAvailablePlayer(@RequestParam("roomId") int roomId) {
        String roomNumber = "R" + roomId;
        int size = -1;
        int index = -1;

        List<Player> playerList = playerService.getAvailablePlayerList(roomNumber);
        size = playerList.size();
        index = (int) (Math.random() * size);

        return playerList.get(index).getPlayer_name();
    }

    @GetMapping("/player/score")
    public int getPlayerScore(@ModelAttribute Player player) {
        player = playerService.getPlayer(player);

        return player.getPlayer_score();
    }

    @GetMapping("/player/score/update")
    public boolean updatePlayerScore(@ModelAttribute Player player) {
        return playerService.updatePlayerScore(player);
    }

    @GetMapping("/player/name/available")
    public boolean isAvailableName(@RequestParam("roomId") String roomId, @RequestParam("playerName") String playerName) {
        boolean result = true;

        List<Player> playerList = playerService.getAvailablePlayerList(roomId);

        for (Player player : playerList) {
            if (player.getPlayer_name().equals(playerName)) {
                result = false;
            }
        }

        return result;
    }
}