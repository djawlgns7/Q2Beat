package org.bit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.bit.model.quiz.QuizListening;
import org.bit.model.quiz.QuizNormal;

import java.util.List;

@Mapper
public interface QuizMapper {
    @Select("select * from quiz_normal where normal_id = #{normal_id}")
    QuizNormal getQuizNormal(int normal_id);

    @Select("select normal_category from quiz_normal group by normal_category")
    List<String> getNormalCategoryNameList();

    @Select("select normal_id from quiz_normal where normal_category = #{category}")
    List<Integer> getNormalQuizNumberList(String category);

    @Select("select count(*) from quiz_normal where normal_id = #{normal_id} and normal_answer = #{normal_answer}")
    int gradingNormal(@Param("normal_id") int normal_id, @Param("normal_answer") int normal_answer);

    @Select("SELECT lyric_id FROM quiz_listening")
    List<Integer> getAllQuizListeningIds();

    @Select("SELECT * FROM quiz_listening WHERE lyric_id = #{listening_id}")
    QuizListening getQuizListening(@Param("listening_id") int listening_id);

    @Select("SELECT COUNT(*) FROM quiz_listening WHERE lyric_id = #{listening_id} AND lyric_answer = #{listening_answer}")
    int gradingListening(@Param("listening_id") int listening_id, @Param("listening_answer") String listening_answer);

    @Select("SELECT quiz_id FROM quiz_history WHERE room_id = #{roomId}")
    List<Integer> getUsedQuizIds(@Param("roomId") String roomId);
}
