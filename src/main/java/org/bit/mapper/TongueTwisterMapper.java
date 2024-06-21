package org.bit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.bit.model.quiz.TongueTwister;

import java.util.List;

@Mapper
public interface TongueTwisterMapper {

    @Select("select twister_id from quiz_tongue_twister")
    List<Integer> getTongueTwisterIdList();

    @Select("select * from quiz_tongue_twister where twister_id = #{twister_id}")
    TongueTwister getTongueTwister(@Param("twister_id") int twister_id);
}
