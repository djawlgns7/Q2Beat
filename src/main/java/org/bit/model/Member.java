package org.bit.model;

import lombok.Data;

@Data
public class Member {
    private int memberId;
    private String memberUsername;
    private String memberEmail;
    private String memberName;
    private String memberPlatform;
    private String memberEnrollment;
}
