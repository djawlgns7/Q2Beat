package org.bit.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bit.model.MemberPlatform;

import java.sql.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    private int memberId;
    private String memberUsername;
    private String memberName;
    private MemberPlatform memberPlatform;
    private Date memberEnrollment;
    private String memberEmail;
}
