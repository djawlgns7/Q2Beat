package org.bit.controller;

import org.bit.model.qbod.BodEx;
import org.bit.service.BodExService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
public class BodExController {
    private final BodExService bodExService;

    @Autowired public BodExController(BodExService bodExService){
        this.bodExService = bodExService;
    }
    //모든 게시물 조회
    @GetMapping
    public List<BodEx> getAllBodEx(){
        return bodExService.getAllBodEx();
    }
    //특정 게시물 조회
    @GetMapping("/{qbod_id}")
    public BodEx getBodExById(@PathVariable int qbod_id){
        return bodExService.getBodExById(qbod_id);
    }
    //게시물 생성
    @PostMapping
    public void insertBodEx(@RequestBody BodEx bodEx){
        bodExService.insertBodEx(bodEx);
    }
    //게시물 수정
    @PutMapping("/{qbod_id}")
    public void updateBodEx(@PathVariable int qbod_id, @RequestBody BodEx bodEx){
        bodEx.setQbod_id(qbod_id);
        bodExService.updateBodEx(bodEx);
    }
    //게시물 삭제
    @DeleteMapping("/{qbod_id}")
    public void deleteBodEx(@PathVariable int qbod_id){
        bodExService.deleteBodEx(qbod_id);
    }
}
