package org.bit.model;

import lombok.Data;

import java.util.Date;

@Data
public class Member {

    private int memberId;
    private String memberUsername;
    private String memberName;
    private String memberPlatform;
    private Date memberEnrollment;

}
