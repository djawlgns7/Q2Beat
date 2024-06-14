package org.bit.model;

import lombok.Builder;
import lombok.Data;
import java.sql.Timestamp;

@Data
@Builder
public class Member {
    private int memberId;
    private String memberUsername;
    private String memberName;
    private MemberPlatform memberPlatform;
    private Timestamp memberEnrollment;
    private String memberEmail;
}
