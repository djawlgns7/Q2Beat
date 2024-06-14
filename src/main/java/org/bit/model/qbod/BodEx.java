package org.bit.model.qbod;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class BodEx {
    private int qbod_id;
    private int memberid;
    private String title;
    private String content;
    private Timestamp create_date;
    private int count;
}