package org.bit.model;

import lombok.Data;

@Data
public class Member {
    private int memberId;
    private String memberEmail;
    private String memberName;
    private String memberPlatform;

    public Member() {}

    public Member(String memberEmail, String memberName, String memberPlatform) {
        this.memberEmail = memberEmail;
        this.memberName = memberName;
        this.memberPlatform = memberPlatform;
    }
}
