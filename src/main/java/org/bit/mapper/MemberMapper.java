package org.bit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.bit.model.Member;

@Mapper
public interface MemberMapper {
    void insertMember(Member member);

    @Select("SELECT * FROM member WHERE member_email = #{email}")
    Member selectMemberByEmail(String email);
}
