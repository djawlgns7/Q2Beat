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

import javax.servlet.http.HttpSession;
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
    public ResponseEntity<QuizListening> getQuizListening(@RequestParam("roomId") String roomId,
                                                          @RequestParam("category") Integer category) {
        System.out.println("Received roomId: " + roomId);  // roomId 로그 출력
        System.out.println("Received category: " + category);  // category 로그 출력

        String formattedRoomId = roomId.startsWith("R") ? roomId : "R" + roomId;
        List<Integer> quizIds = quizService.getListeningQuizNumberListByCategory(category);
        QuizHistory quizHistory = new QuizHistory();
        quizHistory.setRoom_id(formattedRoomId);

        int quizNumber = quizIds.size();
        Set<Integer> usedQuizIds = roomService.getUsedQuizIds(formattedRoomId);

        while (true) {
            if (usedQuizIds.size() == quizNumber) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }

            int randomIndex = (int) (Math.random() * quizNumber);
            int quizId = quizIds.get(randomIndex);

            if (usedQuizIds.contains(quizId)) {
                continue;
            }

            quizHistory.setQuiz_id(quizId);

            try {
                if (roomService.insertQuizHistoryForListening(quizHistory)) {
                    QuizListening quizListening = quizService.getQuizListening(quizId);

                    if (quizListening == null) {
                        System.out.println("Failed to retrieve QuizListening for quizId: " + quizId);
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                    }

                    quizListening.setCategory(category);  // 카테고리 설정
                    return ResponseEntity.ok(quizListening);
                }
            } catch (Exception e) {
                System.err.println("Failed to insert quiz history: " + e.getMessage());
            }
        }
    }

    @GetMapping("/send/answer/listening")
    public Player checkListeningAnswer(@RequestParam("quizId") int quizId,
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
        player.setCorrect(false);
        if (result == 1) {
            player.setPlayer_score(player.getPlayer_score() + 1);
            player.setCorrect(true);

            playerService.updatePlayerScore(player);
        } else {

        }

        // 로그 추가
        System.out.println("Player Info - Name: " + player.getPlayer_name() + ", Score: " + player.getPlayer_score() + ", Correct: " + player.isCorrect());

        return player;
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


    @GetMapping("/player/available")
    public String getAvailablePlayer(@RequestParam("roomId") int roomId) {
        String roomNumber = "R" + roomId;
        int size = -1;
        int index = -1;

        List<Player> playerList = playerService.getAvailablePlayerList(roomNumber);
        size = playerList.size();
        index = (int) (Math.random() * size);

        Player selectedPlayer = playerList.get(index);
        selectedPlayer.setPlayer_team_id(0);

        playerService.updatePlayerTeam(selectedPlayer);

        return selectedPlayer.getPlayer_name();
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

    @GetMapping("/send/skip")
    public ResponseEntity<Map<String, String>> skipQuestion(@RequestParam("roomId") String roomId,
                                                            @RequestParam("playerName") String playerName,
                                                            HttpSession session) {
        playerService.markPlayerSkipped(roomId, playerName, session);

        Map<String, String> response = new HashMap<>();

        // Check if all players have skipped
        boolean allSkipped = playerService.checkAllPlayersSkipped(roomId, session);

        if (allSkipped) {
            // Reset skip status for next round
            playerService.resetSkipStatus(roomId, session);
            response.put("status", "ALL_SKIPPED");
        } else {
            response.put("status", "SKIPPED");
        }

        return ResponseEntity.ok(response);
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