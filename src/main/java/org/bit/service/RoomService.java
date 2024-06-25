package org.bit.service;

import lombok.Data;
import org.bit.mapper.PlayerMapper;
import org.bit.mapper.RoomMapper;
import org.bit.model.QuizHistory;
import org.bit.model.Room;
import org.bit.model.quiz.QuizNormal;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Set;

@Service
@Data
public class RoomService {
    private final RoomMapper roomMapper;
    private final PlayerMapper playerMapper;

    public boolean createRoom(String roomId) {
        return roomMapper.createRoom(roomId);
    }

    public Room getRoomById(String id) {
        return roomMapper.getRoom(id);
    }

    public boolean updateRoom(Room room) {
        return roomMapper.updateRoom(room);
    }

    public int deleteRoom(String id) {
        return roomMapper.deleteRoom(id);
    }

    public boolean insertQuizHistory(QuizHistory quizHistory) {
        try {
            int result = roomMapper.insertQuizHistory(quizHistory);
            return result > 0;
        } catch (Exception e) {
            // 예외 로깅
            e.printStackTrace();
            return false;
        }
    }

    public int clearQuizHistory(String id) {
        return roomMapper.clearQuizHistory(id);
    }

    public void clearRoom(String id) {
        roomMapper.clearQuizHistory(id);
        playerMapper.clearPlayer(id);
        roomMapper.deleteRoom(id);
    }

    public Set<Integer> getUsedQuizIds(String roomId) {
        return roomMapper.getUsedQuizIds(roomId);
    }
}