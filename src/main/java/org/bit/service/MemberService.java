package org.bit.service;

import org.bit.mapper.MemberMapper;
import org.bit.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberMapper memberMapper;

    public void registerMember(Member member) {
        memberMapper.insertMember(member);
    }

    public Member findByEmail(String email) {
        return memberMapper.selectMemberByEmail(email);
    }
}
