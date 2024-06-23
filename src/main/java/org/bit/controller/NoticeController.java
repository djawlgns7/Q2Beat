package org.bit.controller;

import org.bit.model.Q2Notice.Notice;
import org.bit.model.Q2Notice.Pagination;
import org.bit.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    //공지사항 게시글 번호
    @GetMapping("/{notice_id}")
    public Notice getNoticeById(@PathVariable("notice_id") int notice_id) {
        return noticeService.getNoticeById(notice_id);
    }

    //공지사항 게시글 목록 페이지(페이징으로 전체조회)
    @GetMapping
    public Map<String, Object> getNotices(@RequestParam(value = "page", defaultValue = "1") int page,
                                          @RequestParam(value = "size", defaultValue = "5") int size) {
        int totalCount = noticeService.getTotalCount();
        Pagination pagination = new Pagination(page, size, totalCount);

        List<Notice> notices = noticeService.getNoticesByPage(page, size);
        return Map.of(
                "notices", notices,
                "pagination", pagination
        );
    }

    //공지사항 추가
    @PostMapping
    public void addNotice(@RequestBody Notice notice) {
        noticeService.addNotice(notice);
    }

    //공지사항 수정
    @PutMapping("/{notice_id}")
    public void updateNotice(@PathVariable("notice_id") int notice_id, @RequestBody Notice notice) {
        notice.setNotice_id(notice_id);
        noticeService.updateNotice(notice);
    }

    //공지사항 삭제
    @DeleteMapping("/{notice_id}")
    public void deleteNotice(@PathVariable("notice_id") int notice_id) {
        noticeService.deleteNotice(notice_id);
    }
}
