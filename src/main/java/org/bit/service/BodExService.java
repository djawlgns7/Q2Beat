package org.bit.service;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.BodExMapper;
import org.bit.model.qbod.BodEx;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BodExService {
    private final BodExMapper bodExMapper;

    //게시물 등록하기 위한 서비스 매핑
    public void insertBodEx(BodEx bodEx) {
        bodEx.setCreate_date(new Timestamp(System.currentTimeMillis()));
        bodExMapper.insertBodEx(bodEx);
    }
    //특정 게시물 조회하기 위한 서비스 매핑
    public BodEx getBodExById(int qbod_id) {
        return bodExMapper.getBodExById(qbod_id);
    }
    //모든 게시물 조회하기 위한 서비스 매핑
    public List<BodEx> getAllBodEx() {
        return bodExMapper.getAllBodEx();
    }
    //게시물 수정을 위한 서비스 매핑
    public void updateBodEx(BodEx bodEx) {
        bodExMapper.updateBodEx(bodEx);
    }
    //게시물 삭제를 위한 서비스 매핑
    public void deleteBodEx(int qbod_id) {
        bodExMapper.deleteBodEx(qbod_id);
    }
}