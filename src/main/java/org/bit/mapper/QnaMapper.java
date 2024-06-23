package org.bit.mapper;

import org.apache.ibatis.annotations.*;
import org.bit.model.Q2Notice.Qna;

import java.util.List;

@Mapper
public interface QnaMapper {

    //QnA 게시글 번호 조회
    @Select("SELECT * FROM qna WHERE qna_id = #{qna_id}")
    Qna findQnaById(@Param("qna_id") int qna_id);

    //페이지별로 QnA 목록 조회
    @Select("SELECT * FROM qna LIMIT #{offset}, #{size}")
    List<Qna> selectQnaByPage(@Param("offset") int offset, @Param("size") int size);

    //QnA 전체 게시글 수
    @Select("SELECT COUNT(*) FROM qna")
    int countQna();

    //QnA게시글 등록
    @Insert("INSERT INTO qna (member_id, qna_title, qna_content, qna_date, status) VALUES (#{member_id}, #{qna_title}, #{qna_content}, #{qna_date}, 'UNANSWERED')")
    @Options(useGeneratedKeys = true, keyProperty = "qna_id")
    void insertQna(Qna qna);

    //QnA게시글 수정
    @Update("UPDATE qna SET member_id = #{member_id}, qna_title = #{qna_title}, qna_content = #{qna_content}, qna_date = #{qna_date}")
    void updateQna(Qna qna);

    //Qna게시글 삭제
    @Delete("DELETE FROM qna WHERE qna_id = #{qna_id}")
    void deleteQna(@Param("qna_id") int qna_id);

}
