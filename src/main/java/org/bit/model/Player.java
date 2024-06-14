package org.bit.model;

import lombok.Data;

@Data
public class Player {
    private String room_id;
    private String player_name;
    private int player_team_id;
    private int player_score;

    public Player() {

    }

    public Player(String room_id, String player_name) {
        this.room_id = room_id;
        this.player_name = player_name;
    }
}
