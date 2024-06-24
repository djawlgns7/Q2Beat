package org.bit.mapper;

import org.apache.ibatis.annotations.*;
import org.bit.model.Player;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Map;

@Mapper
public interface PlayerMapper {
    @Insert("insert into player(room_id, player_name) values(#{room_id}, #{player_name})")
    boolean createPlayer(Player player);

    @Select("select * from player where room_id = #{room_id} and player_name = #{player_name}")
    Player getPlayerInformation(Player player);

    @Select("select * from player where room_id = #{room_id} and player_name not like '(HOST)%'")
    List<Player> getPlayerList(@Param("room_id") String room_id);

    @Select("select count(player_name) from player where room_id = #{room_id}")
    int getPlayerNumber(String room_id);

    @Update("update player set player_team_id = #{player_team_id} where room_id = #{room_id} and player_name = #{player_name}")
    boolean updatePlayerTeam(Player player);

    @Update("update player set player_score = #{player_score} where room_id = #{room_id} and player_name = #{player_name}")
    boolean updatePlayerScore(Player player);

    @Update("UPDATE player SET player_recent_answer = #{player_recent_answer} WHERE room_id = #{room_id} AND player_name = #{player_name}")
    void updatePlayerRecentAnswer(Player player);

    @Update("update player set player_team_id = null, player_recent_answer = null, player_score = 0 where room_id = #{room_id}")
    void resetPlayerInformation(@Param("room_id") String room_id);

    @Delete("delete from player where room_id = #{room_id} and player_name = #{player_name}")
    int deletePlayer(Player player);

    @Delete("delete from player where room_id = #{room_id}")
    int clearPlayer(String room_id);

    @Select("select count(*) as number from player where room_id = #{room_id} and player_recent_answer = #{answer}")
    int getAnswerNumber(@Param("room_id")String room_id, @Param("answer")int answer);

    @Select("select * from player where room_id = #{room_id} and player_name not like '(HOST)%' order by player_score desc")
    List<Player> getPlayerRank(@Param("room_id")String room_id);

    @Select("select count(*) from player where room_id = #{room_id} and ")
    String getAnswerListenings(@Param("room_id") String room_id, @Param("answer") String answer);

    @Select("select * from player where room_id = #{room_id} and player_score = 0 and player_name not like '(HOST)%'")
    List<Player> getAvailablePlayerList(@Param("room_id") String room_id);

    @Select("SELECT * FROM player WHERE room_id = #{room_id} AND player_name = #{player_name}")
    Player getPlayerByRoomAndName(@Param("room_id") String roomId, @Param("player_name") String playerName);

    @Update("UPDATE player SET player_recent_answer = #{player_recent_answer} WHERE room_id = #{room_id} AND player_name = #{player_name}")
    int updatePlayerRecentAnswerForListening(@Param("player_recent_answer") String player_recent_answer, @Param("room_id") String room_id, @Param("player_name") String player_name);

    @Update("UPDATE player SET player_score = #{player_score} WHERE room_id = #{room_id} AND player_name = #{player_name}")
    int updatePlayerScoreForListening(@Param("player_score") int player_score, @Param("room_id") String room_id, @Param("player_name") String player_name);

}
