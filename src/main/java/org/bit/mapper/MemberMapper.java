package org.bit.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.bit.model.Member;

@Mapper
public interface MemberMapper {
    @Insert("INSERT INTO member (memberEmail, memberName, memberPlatform) VALUES (#{memberEmail}, #{memberName}, #{memberPlatform})")
    void insertMember(Member member);

    @Select("SELECT * FROM member WHERE memberEmail = #{memberEmail}")
    Member selectMemberByEmail(String memberEmail);
}
