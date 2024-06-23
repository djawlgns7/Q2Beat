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
    public Qna getQna(@PathVariable("qna_id") int qna_id) {
        return qnaService.getQnaById(qna_id);
    }

    @GetMapping
    public Map<String, Object> getQna(@RequestParam(value = "page", defaultValue = "1") int page,
                                      @RequestParam(value = "size", defaultValue = "5") int size) {
        int totalQna = qnaService.getQnaTotalCount();
        Pagination pagination = new Pagination(page, size, totalQna);

        List<Qna> qna = qnaService.getAllQnaByPage(page, size);
        return Map.of(
                "qna", qna,
                "pagination", pagination
        );
    }

    @PostMapping
    public void addQna(@RequestBody Qna qna) {
        qnaService.addQna(qna);
    }

    @PutMapping("/{qna_id")
    public void updateQna(@PathVariable("qna_id") int qna_id, @RequestBody Qna qna) {
        qna.setQna_id(qna_id);
        qnaService.updateQna(qna);
    }

    @DeleteMapping("/{qna_id}")
    public void deleteQna(@PathVariable("qna_id") int qna_id) {
        qnaService.deleteQna(qna_id);
    }
}
