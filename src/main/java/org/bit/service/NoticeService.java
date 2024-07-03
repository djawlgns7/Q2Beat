package org.bit.service;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.NoticeMapper;
import org.bit.model.Q2Notice.Notice;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

//    //작성날짜 문자열 -> 날짜 변환
//    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private final NoticeMapper noticeMapper;

    //공지사항 게시글 ID조회
    public Notice getNoticeById(int notice_id) {
        return noticeMapper.findNoticeById(notice_id);
    }

    //공지사항 페이지별 조회(페이징으로 전체 게시글 조회 가능)
    public List<Notice> getNoticesByPage(int currentPage, int pageSize) {
        int offset = (currentPage - 1) * pageSize;
        return noticeMapper.selectNoticesByPage(offset, pageSize);
    }

    //공지사항 게시글 수
    public int getTotalCount() {
        return noticeMapper.countNotices();
    }

    //공지사항 추가
    public void createNotice(Notice notice, String admin_username) {
        notice.setAdmin_username(admin_username);
        notice.setCreate_date(LocalDate.now());
        System.out.println("Creating notice" + notice.getCreate_date());
        noticeMapper.insertNotice(notice);
    }

    //공지사항 수정
    public void updateNotice(Notice notice, String admin_username) {
        notice.setAdmin_username(admin_username);
        noticeMapper.updateNotice(notice);
    }

    //공지사항 삭제
    public void deleteNotice(int notice_id) {
        noticeMapper.deleteNotice(notice_id);
    }
}
