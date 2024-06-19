package org.bit.model.Q2Notice;

import lombok.Data;

@Data
public class Notice {
    private Long note_id;
    private String title;
    private String content;
    private String created_at;
}
