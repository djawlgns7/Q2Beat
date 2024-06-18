package org.bit.controller;

import org.bit.model.Q2Notice.Notice;
import org.bit.model.Q2Notice.Qna;
import org.bit.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NoticeController {
    @Autowired
    private NoticeService noticeService;

    @GetMapping("/notices")
    public List<Notice> getNotice() {
        return noticeService.getNotice();
    }

    @GetMapping("/qna")
    public List<Qna> getQna(){
        return noticeService.getQna();
    }
}
