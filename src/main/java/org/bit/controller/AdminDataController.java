package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.adminservice.PasswordHashUtil;
import org.bit.mapper.AdminMapper;
import org.bit.model.Q2Notice.Admin;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/data")
public class AdminDataController {

    private final AdminMapper adminMapper;

    @GetMapping("/admInsert")
    public String insertAdmin() {
        String username = "ADMIN";
        String password = "q2beat5";
        String name = "관리자";

        Admin admin = adminMapper.findByUsername(username);
        if(admin == null) {
            String hashedPassword = PasswordHashUtil.hashPassword(password);
            admin = new Admin();
            admin.setAdmin_id(1);
            admin.setAdmin_username(username);
            admin.setAdmin_password(hashedPassword);
            admin.setAdmin_name(name);
            adminMapper.insertAdmin(admin);
            System.out.println("관리자 admin 생성:" + username + ", 해시 된 비밀번호" + hashedPassword);
        }
        else {
            System.out.println("관리자 admin 이미 존재: " + username);
        }

        return "아이디: " + username + ", 비밀번호: " + password;
    }
}
