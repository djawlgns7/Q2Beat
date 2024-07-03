package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.adminservice.AdminService;
import org.bit.model.Q2Notice.Admin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AdminController {

    private final AdminService adminService;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @PostMapping("/admLogin")
    public ResponseEntity<?> adminLogin(@RequestBody Admin admin, HttpSession session) {
        Admin foundAdmin = adminService.findByUsername(admin.getAdmin_username());
        if(foundAdmin != null && passwordEncoder.matches(admin.getAdmin_password(),(foundAdmin.getAdmin_password()))) {
            session.setAttribute("admin", foundAdmin); // 세션에 관리자 정보를 저장!
            logger.info("Admin logged in: {}" + foundAdmin.getAdmin_username());
            return ResponseEntity.ok(foundAdmin);
        }
        else {
            logger.warn("Admin login failed for: {}" + admin.getAdmin_username());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ID or PASS check failed");
        }
    }

    @GetMapping("/admLogout")
    public ResponseEntity<Map<String, String>> adminLogout(HttpSession session) {
        session.invalidate();
        logger.info("Admin logged out");

        Map<String, String> response = new HashMap<>();
        response.put("message", "Admin logged out");
        return ResponseEntity.ok(response);
    }

//    @GetMapping("/current_admin")
//    public ResponseEntity<Map<String, Object>> getCurrentAdmin() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//        boolean isAdmin = authentication.getAuthorities().stream()
//                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("username", username);
//        response.put("isAdmin", isAdmin);
//
//        return ResponseEntity.ok(response);
//    }
}
