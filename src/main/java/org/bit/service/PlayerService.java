package org.bit.service;

import lombok.Data;
import org.bit.mapper.PlayerMapper;
import org.bit.model.Player;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Data
@Service
public class PlayerService {
    private final PlayerMapper playerMapper;

    public boolean createPlayer(Player player) {
        return playerMapper.createPlayer(player);
    }

    public Player getPlayer(Player player) {
        return playerMapper.getPlayerInformation(player);
    }

    public List<Player> getPlayerList(String roomId) {
        return playerMapper.getPlayerList(roomId);
    }

    public int getPlayerNumber(String roomId) {
        return playerMapper.getPlayerNumber(roomId);
    }

    public boolean updatePlayerTeam(Player player) {
        return playerMapper.updatePlayerTeam(player);
    }

    public boolean updatePlayerScore(Player player) {
        return playerMapper.updatePlayerScore(player);
    }

    public void resetPlayerInformation(String roomId) {
        playerMapper.resetPlayerInformation(roomId);
    }

    public void updatePlayerRecentAnswer(Player player) { playerMapper.updatePlayerRecentAnswer(player);}

    public int deletePlayer(Player player) {
        return playerMapper.deletePlayer(player);
    }

    public int clearPlayer(String roomId) {
        return playerMapper.clearPlayer(roomId);
    }

    public int getAnswerNumbers(String roomId, int answer) {
        return playerMapper.getAnswerNumber(roomId, answer);
    }

    public List<Player> getPlayerRank(String roomId) {
        return playerMapper.getPlayerRank(roomId);
    }

    public Player getPlayerByRoomAndName(String roomId, String playerName) {
        return playerMapper.getPlayerByRoomAndName(roomId, playerName);
    }

    public void updatePlayerRecentAnswerByRoomAndName(String roomId, String playerName, String answer) {
        Player player = new Player();
        player.setRoom_id(roomId);
        player.setPlayer_name(playerName);
        player.setPlayer_recent_answer(answer);
        playerMapper.updatePlayerRecentAnswer(player);
    }

}
