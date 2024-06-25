package org.bit.mapper;

import org.apache.ibatis.annotations.*;
import org.bit.model.QuizHistory;
import org.bit.model.Room;

import java.util.Set;

@Mapper
public interface RoomMapper {
    @Insert("insert into room(room_id) values(#{room_id})")
    boolean createRoom(String room_id);

    @Select("select * from room where room_id = #{id}")
    Room getRoom(String id);

    @Update("update room set room_type = #{room_type}, room_total_round = #{room_total_round} where room_id = #{room_id}")
    boolean updateRoom(Room room);

    @Delete("delete from room where room_id = #{room_id}")
    int deleteRoom(String id);

    @Insert("insert into quiz_history(room_id, quiz_id) values(#{room_id}, #{quiz_id})")
    int insertQuizHistory(QuizHistory quizHistory);

    @Delete("delete from quiz_history where room_id = #{room_id}")
    int clearQuizHistory(String room_id);

    @Select("SELECT COUNT(*) FROM quiz_history WHERE room_id = #{roomId} AND quiz_id = #{quizId}")
    int getQuizHistoryCount(@Param("roomId") String roomId, @Param("quizId") int quizId);

    @Select("SELECT quiz_id FROM quiz_history WHERE room_id = #{roomId}")
    Set<Integer> getUsedQuizIds(String roomId);

}
