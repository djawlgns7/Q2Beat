package org.bit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.bit.model.Q2Notice.Notice;
import org.bit.model.Q2Notice.Qna;

import java.util.List;

@Mapper
public interface NoticeMapper {
    @Select("SELECT * FROM Notice")
    List<Notice> getNotice();

    @Select("SELECT * FROM Qna")
    List<Qna> getQna();
}
