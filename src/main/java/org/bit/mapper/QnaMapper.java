package org.bit.mapper;

import org.apache.ibatis.annotations.*;
import org.bit.model.Q2Notice.Qna;

import java.util.List;

@Mapper
public interface QnaMapper {

    //QnA 게시글 번호 조회
    @Select("SELECT * FROM qna WHERE qna_id = #{qna_id}")
    Qna findQnaById(@Param("qna_id") int qna_id);

    //페이지별로 QnA 목록 조회(최신 순)
    @Select("SELECT * FROM qna WHERE status != 'HIDDEN' ORDER BY qna_date DESC LIMIT #{offset}, #{pageSize}")
    List<Qna> selectQnaByPage(@Param("offset") int offset, @Param("pageSize") int pageSize);

    //QnA 전체 게시글 수
    @Select("SELECT COUNT(*) FROM qna WHERE status != 'HIDDEN'")
    int countQna();

    //일반회원 QnA게시글 등록
    @Insert("INSERT INTO qna (member_username, qna_title, qna_content, qna_date, status)" +
            "VALUES (#{member_username}, #{qna_title}, #{qna_content}, #{qna_date}, #{status})")
    @Options(useGeneratedKeys = true, keyProperty = "qna_id")
    void insertQna(Qna qna);

    //일반회원 QnA게시글 수정
    @Update("UPDATE qna SET member_username = #{member_username} " +
            "qna_title = #{qna_title}, qna_content = #{qna_content}," +
            "qna_date = #{qna_date}, status = #{status} WHERE qna_id = #{qna_id}")
    void updateQna(Qna qna);

    //Qna게시글 삭제
    @Delete("DELETE FROM qna WHERE qna_id = #{qna_id}")
    void deleteQna(@Param("qna_id") int qna_id);

    //관리자 QnA 답글 등록
    @Update("UPDATE qna SET admin_username =#{admin_username}, answer_content =#{answer_content}," +
            "answer_date =#{answer_date}, status = 'ANSWERED' WHERE qna_id =#{qna_id}")
    void insertAnswer(Qna answer);

    //게시글 비밀글 처리(일반 사용자 관리자 모두 사용가능)
    @Update("UPDATE qna SET status = 'SECRET' WHERE qna_id =#{qna_id}")
    void markAsSecret(@Param("qna_id") int qna_id);

    //관리자 게시글 가림 처리
    @Update("UPDATE qna SET status = 'HIDDEN' WHERE qna_id =#{qna_id}")
    void hideQna(@Param("qna_id") int qna_id);

    // 관리자 게시글 가림 해제 처리
    @Update("UPDATE qna SET status = #{status} WHERE qna_id = #{qna_id}")
    void unHideQna(@Param("qna_id") int qna_id, @Param("status") Qna.QnaStatus status);

}
