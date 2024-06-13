package org.bit.service;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.MemberMapper;
import org.bit.model.Member;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberMapper memberMapper;

    public void registerMember(Member member) {
        memberMapper.insertMember(member);
    }

    public Member findByEmail(String memberEmail) {
        return memberMapper.selectMemberByEmail(memberEmail);
    }
}
