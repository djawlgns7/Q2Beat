package org.bit.model;

import lombok.Data;

@Data
public class Player {
    private String room_id;
    private String player_name;
    private int player_team_id;
    private String player_recent_answer;
    private int player_score;
    private boolean isCorrect;
    private boolean isSkipped;
    private byte[] player_image;

    public Player() {

    }

    public Player(String room_id, String player_name) {
        this.room_id = room_id;
        this.player_name = player_name;
    }
}
