package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.Member;
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

        Member existingMember = memberService.findBySocialIdAndPlatform(socialId, platform);

        if (existingMember == null) {
            // 새로운 회원인 경우
            Member newMember = new Member();
            newMember.setMemberName(name);
            newMember.setMemberPlatform(platform);
            newMember.setMemberUsername(socialId);
            memberService.registerMember(newMember);

            // 새로 생성된 회원 객체를 다시 조회하여 ID 값을 설정
            Member savedMember = memberService.findBySocialIdAndPlatform(socialId, platform);
            session.setAttribute("member", savedMember);
            return ResponseEntity.ok("nickname");
        } else {
            session.setAttribute("member", existingMember);
            return ResponseEntity.ok(existingMember.getMemberUsername() == null || existingMember.getMemberUsername().isEmpty() ? "nickname" : "logged in");
        }
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
        memberService.save(member);

        // 세션에 업데이트된 사용자 객체를 저장
        session.setAttribute("member", member);

        return ResponseEntity.ok("nickname set");
    }

    @PostMapping("/logout")
    @ResponseBody
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("logged out");
    }
}
