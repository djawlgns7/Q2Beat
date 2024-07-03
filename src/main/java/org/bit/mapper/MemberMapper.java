package org.bit.mapper;

import org.apache.ibatis.annotations.*;
import org.bit.model.Member;
import org.bit.model.MemberPlatform;

@Mapper
public interface MemberMapper {

    @Insert("INSERT INTO member (member_username, member_name, member_platform, member_enrollment, member_email) VALUES (#{memberUsername}, #{memberName}, #{memberPlatform}, CURRENT_TIMESTAMP, #{memberEmail})")
    void insertMember(Member member);

    @Select("SELECT * FROM member WHERE member_username = #{memberUsername} AND member_platform = #{memberPlatform}")
    Member findBySocialIdAndPlatform(@Param("memberUsername") String memberUsername, @Param("memberPlatform") MemberPlatform memberPlatform);

    @Update("UPDATE member SET member_username = #{memberUsername} WHERE member_id = #{memberId}")
    void updateMemberUsername(@Param("memberId") int memberId, @Param("memberUsername") String memberUsername);

    @Select("SELECT * FROM member WHERE member_email = #{memberEmail}")
    Member findByEmail(String memberEmail);

    @Select("SELECT * FROM member WHERE member_username = #{memberUsername}")
    Member findByUsername(String memberUsername);

    @Select("SELECT * FROM member WHERE member_id = #{member_id}")
    Member findById(int member_id);
}
