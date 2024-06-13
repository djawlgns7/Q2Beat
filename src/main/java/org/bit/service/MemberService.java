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
        member.setMemberEnrollment(new java.sql.Date(System.currentTimeMillis())); // 현재 날짜로 설정

        // 소셜 ID 길이 제한
        if (member.getMemberUsername().length() > 100) {
            member.setMemberUsername(member.getMemberUsername().substring(0, 100));
        }

        memberMapper.insertMember(member);
    }

    public Member findBySocialIdAndPlatform(String socialId, String platform) {
        return memberMapper.findBySocialIdAndPlatform(socialId, platform);
    }

    public void save(Member member) {
        // member_id가 설정되어 있는지 확인
        if (member.getMemberId() == 0) {
            Member existingMember = findBySocialIdAndPlatform(member.getMemberUsername(), member.getMemberPlatform());
            if (existingMember != null) {
                member.setMemberId(existingMember.getMemberId());
            }
        }
        memberMapper.updateMember(member);
    }
}
