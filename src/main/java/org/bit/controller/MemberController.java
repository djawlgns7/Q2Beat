package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.Member;
import org.bit.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/social-login")
    @ResponseBody
    public ResponseEntity<String> socialLogin(@RequestBody Member member, HttpSession session) {
        Member existingMember = memberService.findByEmail(member.getMemberEmail());
        if (existingMember == null) {
            memberService.registerMember(member);
            session.setAttribute("member", member);
            return ResponseEntity.ok("registered");
        } else {
            session.setAttribute("member", existingMember);
            return ResponseEntity.ok("logged in");
        }
    }

    @PostMapping("/logout")
    @ResponseBody
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("logged out");
    }
}
