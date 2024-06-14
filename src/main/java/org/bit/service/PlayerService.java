package org.bit.service;

import lombok.Data;
import org.bit.mapper.PlayerMapper;
import org.bit.model.Player;
import org.springframework.stereotype.Service;

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

    public int getPlayerNumber(String roomId) {
        return playerMapper.getPlayerNumber(roomId);
    }

    public boolean updatePlayerTeam(Player player) {
        return playerMapper.updatePlayerTeam(player);
    }

    public boolean updatePlayerScore(Player player) {
        return playerMapper.updatePlayerScore(player);
    }

    public boolean updatePlayerRecentAnswer(Player player) {
        return playerMapper.updatePlayerRecentAnswer(player);
    }

    public int deletePlayer(Player player) {
        return playerMapper.deletePlayer(player);
    }

    public int clearPlayer(String roomId) {
        return playerMapper.clearPlayer(roomId);
    }
}
