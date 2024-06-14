package org.bit.model;

import lombok.Data;
import org.bit.service.QuizService;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Data
public class RoomInformation {
    private Set<Integer> existRooms;
    private Map<Integer, List<Integer>> roomsHistory;
    private final QuizService quizService;

    public RoomInformation(QuizService quizService) {
        this.quizService = quizService;
        this.existRooms = new HashSet<>();
        this.roomsHistory = new HashMap<>();
    }

    // 웹소캣 핸들러에서 새로운 방이 생성될 때 실행
    public boolean addRoom(int roomNumber) {
        if (existRooms.add(roomNumber)) {
            if (roomsHistory.put(roomNumber, new ArrayList<>()) != null) {
                return true;
            }
            existRooms.remove(roomNumber);
            return false;
        }
        return false;
    }

    // 웹소캣 핸들러에서 방이 사라질 때 실행
    public void removeRoom(int roomNumber) {
        roomsHistory.remove(roomNumber);
        existRooms.remove(roomNumber);
    }

    // 문제 출제 기록 저장
    public void addHistory (int roomNumber, int quizId) {
        roomsHistory.get(roomNumber).add(quizId);
    }

    // 랜덤으로 출제된 기록이 없는 문제 출제
    public int getQuizId(int roomNumber, List<Integer> quizList) {
        List<Integer> quizHistory = roomsHistory.get(roomNumber);
        int quizNumber = quizList.size();
        int randomQuiz = -1;

        while(true) {
            randomQuiz = (int)(Math.random() * quizNumber);

            if (!quizHistory.isEmpty() && !quizHistory.contains(quizList.get(randomQuiz))) {
                break;
            }
        }

        addHistory(roomNumber, randomQuiz);

        return randomQuiz;
    }
}
