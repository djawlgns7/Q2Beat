package org.bit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
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
}
