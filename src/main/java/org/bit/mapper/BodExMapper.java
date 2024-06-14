package org.bit.mapper;

import org.apache.ibatis.annotations.*;
import org.bit.model.qbod.BodEx;

import java.util.List;

@Mapper
public interface BodExMapper {

    @Select("SELECT * FROM qbod WHERE qbod_id = #{qbod_Id}")
    BodEx getBodExById(int qbod_Id);

    @Select("SELECT * FROM qbod")
    List<BodEx> getAllBodEx();

    @Insert("INSERT INTO qbod(memberid, title, content) VALUES(#{memberid}, #{title}, #{content})")
    @Options(useGeneratedKeys = true, keyProperty = "qbod_Id")
    void insertBodEx(BodEx bodEx);

    @Update("UPDATE qbod SET memberid=#{memberid}, title=#{title}, content=#{content}, count=#{count} WHERE qbod_id=#{qbod_Id}")
    void updateBodEx(BodEx bodEx);

    @Delete("DELETE FROM qbod WHERE qbod_id=#{qbod_Id}")
    void deleteBodEx(int qbod_Id);
}
