package org.bit.service;

import lombok.Data;
import org.apache.ibatis.annotations.Param;
import org.bit.mapper.BlobToByteArrayConverter;
import org.bit.mapper.PlayerMapper;
import org.bit.model.Player;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.InputStream;
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

    public List<Player> getAvailablePlayerList(String roomId) {
        return playerMapper.getAvailablePlayerList(roomId);
    }

    public String getAnswerListening(String roomId) {
        return playerMapper.getAnswerListening(roomId);
    }

    public void updatePlayerImage(Player player) {
        playerMapper.updatePlayerImage(player);
    }

    public byte[] getPlayerImage(String roomId, String playerName) {
        byte[] imageBytes = null;
        try {
            InputStream inputStream = playerMapper.getPlayerImage(roomId, playerName);
            if (inputStream == null) {
                System.err.println("No image found for roomId: " + roomId + ", playerName: " + playerName);
            } else {
                imageBytes = BlobToByteArrayConverter.convert(inputStream);
                System.out.println("Image size: " + imageBytes.length);
            }
        } catch (Exception e) {
            e.printStackTrace(); // 전체 스택 트레이스 출력
        }
        return imageBytes;
    }
}
