package org.bit.service;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.MemberMapper;
import org.bit.model.Member;
import org.bit.model.MemberPlatform;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;

    public void registerMember(Member member) {
        member.setMemberEnrollment(new Timestamp(System.currentTimeMillis())); // 현재 시간을 설정합니다.
        memberMapper.insertMember(member);
    }

    public Member findBySocialIdAndPlatform(String socialId, MemberPlatform platform) {
        return memberMapper.findBySocialIdAndPlatform(socialId, platform);
    }

    public void updateMemberUsername(int memberId, String memberUsername) {
        memberMapper.updateMemberUsername(memberId, memberUsername);
    }

    public Member findByEmail(String email) {
        return memberMapper.findByEmail(email);
    }

    public boolean nicknameExist(String nickname) {
        return memberMapper.findByUsername(nickname)!= null;
    }

    public Member findById(int memberId) {
        return memberMapper.findById(memberId);
    }
}
