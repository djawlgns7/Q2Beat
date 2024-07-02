package org.bit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.bit.model.quiz.QuizPose;

import java.util.List;

@Mapper
public interface PoseMapper {

    @Select("select pose_id from quiz_pose where pose_level = #{pose_level}")
    List<Integer> getPoseIdList(@Param("pose_level") String pose_level);

    @Select("select * from quiz_pose where pose_id = #{pose_id}")
    QuizPose getPose(@Param("pose_id") int pose_id);
}
