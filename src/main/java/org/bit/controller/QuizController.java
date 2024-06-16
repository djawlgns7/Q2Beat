package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.Player;
import org.bit.model.QuizHistory;
import org.bit.model.quiz.PlayerAnswerNumbers;
import org.bit.model.quiz.QuizNormal;
import org.bit.model.RoomInformation;
import org.bit.service.PlayerService;
import org.bit.service.QuizService;
import org.bit.service.RoomService;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
}
