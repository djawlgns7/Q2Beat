package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.Member;
import org.bit.model.MemberPlatform;
import org.bit.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/social-login")
    @ResponseBody
    public ResponseEntity<String> socialLogin(@RequestBody Map<String, String> payload, HttpSession session) {
        String socialId = payload.get("socialId");
        String platform = payload.get("platform");
        String name = payload.get("name");
        String email = payload.get("email");

        Member existingMember = memberService.findByEmail(email);

        if (existingMember != null) {
            if (!existingMember.getMemberPlatform().toString().equalsIgnoreCase(platform)) {
                return ResponseEntity.status(400).body("User already exists with different platform");
            }
            session.setAttribute("member", existingMember);
            return ResponseEntity.ok(existingMember.getMemberUsername() == null || existingMember.getMemberUsername().isEmpty() ? "nickname" : "logged in");
        }

        Member newMember = Member.builder()
                .memberName(name)
                .memberPlatform(MemberPlatform.valueOf(platform.toUpperCase()))
                .memberUsername(null)
                .memberEmail(email)
                .build();
        memberService.registerMember(newMember);

        Member savedMember = memberService.findByEmail(email);
        session.setAttribute("member", savedMember);
        return ResponseEntity.ok("nickname");
    }

    @PostMapping("/set-nickname")
    @ResponseBody
    public ResponseEntity<String> setNickname(@RequestBody Map<String, String> payload, HttpSession session) {
        Member member = (Member) session.getAttribute("member");
        if (member == null) {
            return ResponseEntity.status(401).body("Session expired");
        }

        String nickname = payload.get("nickname");
        member.setMemberUsername(nickname);

        try {
            memberService.updateMemberUsername(member.getMemberId(), nickname);
            session.setAttribute("member", member);
            return ResponseEntity.ok("nickname set");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update nickname");
        }
    }

    @PostMapping("/logout")
    @ResponseBody
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("logged out");
    }
}
