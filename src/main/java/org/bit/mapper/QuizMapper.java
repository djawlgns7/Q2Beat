package org.bit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.bit.model.QuizNormal;

@Mapper
public interface QuizMapper {
    @Select("select * from quiz_normal where normal_id = #{normal_id}")
    QuizNormal getQuizNormal(int normal_id);
}
