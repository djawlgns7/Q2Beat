package org.bit.mapper;

import org.apache.ibatis.annotations.*;
import org.bit.model.Player;

@Mapper
public interface PlayerMapper {
    @Insert("insert into player(room_id, player_name) values(#{room_id}, #{player_name})")
    boolean createPlayer(Player player);

    @Select("select * from player where room_id = #{room_id} and player_name = #{player_name}")
    Player getPlayerInformation(Player player);

    @Select("select count(player_name) from player where room_id = #{room_id}")
    int getPlayerNumber(String room_id);

    @Update("update player set player_team_id = #{player_team_id} where room_id = #{room_id} and player_name = #{player_name}")
    boolean updatePlayerTeam(Player player);

    @Update("update player set player_score = #{player_score} where room_id = #{room_id} and player_name = #{player_name}")
    boolean updatePlayerScore(Player player);

    @Update("update player set player_recent_answer = #{player_recent_answer} where room_id = #{room_id} and player_name = #{player_name}")
    boolean updatePlayerRecentAnswer(Player player);

    @Delete("delete from player where room_id = #{room_id} and player_name = #{player_name}")
    int deletePlayer(Player player);

    @Delete("delete from player where room_id = #{room_id}")
    int clearPlayer(String room_id);
}
