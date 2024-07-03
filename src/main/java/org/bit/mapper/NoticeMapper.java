package org.bit.mapper;

import org.apache.ibatis.annotations.*;
import org.bit.model.Q2Notice.Notice;

import java.util.List;

@Mapper
public interface NoticeMapper {

    //공지사항 ID 조회
    @Select("SELECT * FROM notice WHERE notice_id = #{notice_id}")
    Notice findNoticeById(@Param("notice_id") int notice_id);

    //공지사항 페이지별로 목록 조회(페이징으로 전체 게시글 조회)
    @Select("SELECT * FROM notice ORDER BY create_date DESC LIMIT #{offset}, #{pageSize}")
    List<Notice> selectNoticesByPage(@Param("offset") int offset, @Param("pageSize") int pageSize);

    //공지사항 게시글 수
    @Select("SELECT COUNT(*) FROM notice")
    int countNotices();

    //공지사항 게시글 등록
    @Insert("INSERT INTO notice (notice_id, title, content, create_date, admin_username)" +
            "VALUES (#{notice_id}, #{title}, #{content},#{create_date}, #{admin_username})")
    @Options(useGeneratedKeys = true, keyProperty = "notice_id")
    void insertNotice(Notice notice);

    //공지사항 게시글 수정
    @Update("UPDATE notice SET admin_username =#{admin_username}, title =#{title}," +
            "content =#{content}, create_date =#{create_date}" +
            "WHERE notice_id = #{notice_id}")
    void updateNotice(Notice notice);

    //공지사항 게시글 삭제
    @Delete("DELETE FROM notice WHERE notice_id = #{notice_id}")
    void deleteNotice(@Param("notice_id") int notice_id);
}