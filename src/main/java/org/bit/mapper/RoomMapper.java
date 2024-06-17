package org.bit.mapper;

import org.apache.ibatis.annotations.*;
import org.bit.model.QuizHistory;
import org.bit.model.Room;

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
    boolean insertQuizHistory(QuizHistory quizHistory);

    @Delete("delete from quiz_history where room_id = #{room_id}")
    int clearQuizHistory(String room_id);
}