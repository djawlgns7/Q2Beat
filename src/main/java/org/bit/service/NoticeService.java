package org.bit.service;

import org.bit.mapper.NoticeMapper;
import org.bit.model.Q2Notice.Notice;
import org.bit.model.Q2Notice.Qna;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    public List<Notice> getNotice(int page, int pageSize){
        int offset = (page - 1) * pageSize;
        return noticeMapper.getNotice(pageSize, offset);
    }

    public int getNoticeCount(){
        return noticeMapper.getNoticeCount();
    }

    public List<Qna> getQna(){
        return noticeMapper.getQna();
    }
}
