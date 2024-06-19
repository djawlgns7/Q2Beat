package org.bit.controller;

import org.bit.model.Q2Notice.Notice;
import org.bit.model.Q2Notice.Pagination;
import org.bit.model.Q2Notice.Qna;
import org.bit.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class NoticeController {
    @Autowired
    private NoticeService noticeService;

    @GetMapping("/notices")
    public Map<String, Object> getNotice(@RequestParam(defaultValue = "1") int page,
                                         @RequestParam(defaultValue = "10") int pageSize) {
        List<Notice> notices = noticeService.getNotice(page, pageSize);
        int totalCount = noticeService.getNoticeCount();

        Map<String, Object> response = new HashMap<>();
        response.put("data", notices);
        response.put("pagination", new Pagination(page, pageSize, totalCount));

        return response;
    }

    @GetMapping("/qna")
    public List<Qna> getQna(){
        return noticeService.getQna();
    }
}
