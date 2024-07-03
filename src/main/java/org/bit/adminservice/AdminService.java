package org.bit.adminservice;

import lombok.RequiredArgsConstructor;
import org.bit.mapper.AdminMapper;
import org.bit.model.Q2Notice.Admin;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AdminService {

    private final AdminMapper adminMapper;

    public Admin findByUsername(String username){
        return adminMapper.findByUsername(username);
    }
}
