package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.Q2Notice.Admin;
import org.bit.model.Q2Notice.Notice;
import org.bit.model.Q2Notice.Pagination;
import org.bit.service.NoticeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    //공지사항 게시글 목록 페이지(페이징으로 전체조회)
    //ResponseEntity<>의 메소드 객체를 담음, 서버와의 요청처리를 확인.
    @GetMapping
    public ResponseEntity<Map<String, Object>> getNotices(@RequestParam(defaultValue = "1") int page,
                                                          @RequestParam(defaultValue = "5") int pageSize) {
        try {
            List<Notice> notices = noticeService.getNoticesByPage(page, pageSize);
            int totalCount = noticeService.getTotalCount();
            Pagination pagination = new Pagination(page, pageSize, totalCount);

            // 페이지 블록 계산
            int blockSize = 5;
            int startPage = ((page - 1) / blockSize) * blockSize + 1;
            int endPage = Math.min(startPage + blockSize - 1, pagination.getTotalPages());
            pagination.setStartPage(startPage);
            pagination.setEndPage(endPage);

            Map<String, Object> response = new HashMap<>();
            response.put("notices", notices);
            response.put("pagination", pagination);

            //요청이 성공했을 때 200 OK 응답을 반환
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            //에러가 발생하면 500 Internal Server Error 응답을 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //공지사항 추가
    @PostMapping("/create")
    public void createNotice(@RequestBody Notice notice) {
        notice.setCreate_date(LocalDate.now());
        noticeService.createNotice(notice, notice.getAdmin_username());
    }

    //공지사항 게시글 번호 조회
    @GetMapping("/{notice_id}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable("notice_id") int notice_id) {
        Notice notice = noticeService.getNoticeById(notice_id);
        if (notice == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(notice);
    }

    //공지사항 수정
    @PutMapping("/{notice_id}")
    public void updateNotice(@PathVariable("notice_id") int notice_id, @RequestBody Notice notice,
                             HttpSession session) {
        notice.setNotice_id(notice_id);
        String admin_username = (String) session.getAttribute("admin_username");
        noticeService.updateNotice(notice, admin_username);
    }

    //공지사항 삭제
    @DeleteMapping("/{notice_id}")
    public void deleteNotice(@PathVariable("notice_id") int notice_id) {
        noticeService.deleteNotice(notice_id);
    }
}
