package org.bit.service;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.MemberMapper;
import org.bit.model.Member;
import org.bit.model.MemberPlatform;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;

    public void registerMember(Member member) {
        memberMapper.insertMember(member);
    }

    public Member findBySocialIdAndPlatform(String socialId, MemberPlatform platform) {
        return memberMapper.findBySocialIdAndPlatform(socialId, platform);
    }

    public void updateMemberUsername(int memberId, String memberUsername) { // 변경된 부분
        memberMapper.updateMemberUsername(memberId, memberUsername);
    }

    public Member findByEmail(String email) {
        return memberMapper.findByEmail(email);
    }

    public void save(Member member) {
        memberMapper.insertMember(member);
    }
}
