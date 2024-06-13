package org.bit.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.bit.model.Member;

@Mapper
public interface MemberMapper {

    @Insert("INSERT INTO member (member_username, member_name, member_platform, member_enrollment) VALUES (#{memberUsername}, #{memberName}, #{memberPlatform}, #{memberEnrollment})")
    void insertMember(Member member);

    @Select("SELECT * FROM member WHERE member_username = #{socialId} AND member_platform = #{platform}")
    Member findBySocialIdAndPlatform(@Param("socialId") String socialId, @Param("platform") String platform);

    @Update("UPDATE member SET member_username = #{memberUsername}, member_name = #{memberName}, member_platform = #{memberPlatform}, member_enrollment = #{memberEnrollment} WHERE member_id = #{memberId}")
    void updateMember(Member member);
}
