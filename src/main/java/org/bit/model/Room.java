package org.bit.model;

import lombok.Data;

import java.util.List;

@Data
public class Room {
    private String room_id;
    private String room_type;
    private int room_total_round;
}
