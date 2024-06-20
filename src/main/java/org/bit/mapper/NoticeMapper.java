package org.bit.mapper;

import org.apache.ibatis.annotations.*;
import org.bit.model.Q2Notice.Notice;
import java.util.List;

@Mapper
public interface NoticeMapper {

    //공지사항 ID 조회
    @Select("SELECT * FROM notice WHERE notice_id = #{notice_id}")
    Notice selectNoticeById(@Param("notice_id") int notice_id);

    //페이지네이션 공지사항 목록 조회
    @Select("SELECT * FROM notice LIMIT #{offset}, #{size}")
    List<Notice> selectNoticesByPage(@Param("offset") int offset, @Param("size") int size);

    //공지사항 게시글 수
    @Select("SELECT COUNT(*) FROM notice")
    int countNotices();

    //공지사항 목록 조회
    @Select("SELECT * FROM notice")
    List<Notice> selectAllNotices();

    //공지사항 게시글 등록
    @Insert("INSERT INTO notice (member_id, title, content, create_date, count) VALUES (#{member_id}, #{title}, #{content}, #{create_date}, #{count})")
    @Options(useGeneratedKeys = true, keyProperty = "notice_id")
    void insertNotice(Notice notice);

    //공지사항 게시글 수정
    @Update("UPDATE notice SET member_id = #{member_id}, title = #{title}, content = #{content}, create_date = #{create_date}, count = #{count} WHERE notice_id = #{notice_id}")
    void updateNotice(Notice notice);

    //공지사항 게시글 삭제
    @Delete("DELETE FROM notice WHERE notice_id = #{notice_id}")
    void deleteNotice(@Param("notice_id") int notice_id);
}