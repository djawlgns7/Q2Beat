package org.bit.service;

import org.bit.mapper.NoticeMapper;
import org.bit.model.Q2Notice.Notice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    //작성날짜 문자열 -> 날짜 변환
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    //공지사항 게시글 번호
    public Notice getNoticeById(int notice_id) {
        Notice notice = noticeMapper.selectNoticeById(notice_id);
        return notice;
    }

    //공지사항 전체 게시글 조회
    public List<Notice> getAllNotices() {
        List<Notice> notices = noticeMapper.selectAllNotices();
        return notices;
    }

    //공지사항 페이지
    public List<Notice> getNoticesByPage(int page, int size) {
        int offset = (page - 1) * size;
        return noticeMapper.selectNoticesByPage(offset, size);
    }

    //공지사항 게시글 수
    public int getTotalCount() {
        return noticeMapper.countNotices();
    }

    //공지사항 추가
    public void addNotice(Notice notice) {
        //String create_date 변환 -> 현재날짜
        notice.setCreate_date(LocalDate.now().format(formatter));
        noticeMapper.insertNotice(notice);
    }

    //공지사항 수정
    public void updateNotice(Notice notice) {
        //String create_date 변환 -> 현재날짜
        notice.setCreate_date(LocalDate.now().format(formatter));
        noticeMapper.updateNotice(notice);
    }

    //공지사항 삭제
    public void deleteNotice(int notice_id) {
        noticeMapper.deleteNotice(notice_id);
    }
}
