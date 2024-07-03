package org.bit.controller;

import org.bit.model.Q2Notice.Pagination;
import org.bit.model.Q2Notice.Qna;
import org.bit.service.QnaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/qna")
public class QnaController {

    @Autowired
    private QnaService qnaService;

    @GetMapping("/{qna_id}")
    public Qna getQnaId(@PathVariable("qna_id") int qna_id) {
        return qnaService.getQnaById(qna_id);
    }

    @GetMapping
    public Map<String, Object> getQnaList(@RequestParam(value = "page", defaultValue = "1") int page,
                                      @RequestParam(value = "size", defaultValue = "5") int pageSize) {
        int totalQna = qnaService.getQnaTotalCount();
        Pagination pagination = new Pagination(page, pageSize, totalQna);

        List<Qna> qna = qnaService.getAllQnaByPage(page, pageSize);
        return Map.of(
                "qna", qna,
                "pagination", pagination
        );
    }

    @PostMapping("/qnaCreate")
    public void createQna(@RequestBody Qna qna) {
        if(qna.getStatus() == null) {
            qna.setStatus(Qna.QnaStatus.UNANSWERED); //기본 상태 설정값
        }
        qnaService.addQna(qna);
    }

    @PutMapping("/{qna_id}")
    public void updateQna(@PathVariable("qna_id") int qna_id, @RequestBody Qna qna) {
        qna.setQna_id(qna_id);
        qnaService.updateQna(qna);
    }

    @DeleteMapping("/{qna_id}")
    public void deleteQna(@PathVariable("qna_id") int qna_id) {
        qnaService.deleteQna(qna_id);
    }

    // 관리자 QnA 답글 등록
    @PostMapping("/answer")
    public void insertAnswer(@RequestBody Qna answer) {
        qnaService.insertAnswer(answer);
    }

    // 게시글 비밀글 처리(일반 사용자, 관리자)
    @PatchMapping("/secret/{qna_id}")
    public void markAsSecret(@PathVariable("qna_id") int qna_id) {
        qnaService.markAsSecret(qna_id);
    }

    // 관리자 게시글 가림 처리
    @PatchMapping("/hide/{qna_id}")
    public void hideQna(@PathVariable("qna_id") int qna_id) {
        qnaService.hideQna(qna_id);
    }

    // 관리자 게시글 가림 해제
    @PatchMapping("/unhide/{qna_id}")
    public void unHideQna(@PathVariable("qna_id") int qna_id, @RequestBody Qna.QnaStatus status) {
        qnaService.unHideQna(qna_id, status);
    }
}
