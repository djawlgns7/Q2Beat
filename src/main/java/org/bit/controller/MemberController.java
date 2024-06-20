// MemberController.java
package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.Member;
import org.bit.model.MemberPlatform;
import org.bit.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;
    private final RestTemplate restTemplate;

    @GetMapping("/google/userinfo")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getGoogleUserInfo(@RequestParam String access_token) {
        String url = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + access_token;
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/social-login")
    @ResponseBody
    public ResponseEntity<Member> socialLogin(@RequestBody Map<String, String> payload, HttpSession session) {
        String socialId = payload.get("socialId");
        String platform = payload.get("platform");
        String name = payload.get("name");
        String email = payload.get("email");

        Member existingMember = memberService.findByEmail(email);

        if (existingMember != null) {
            if (!existingMember.getMemberPlatform().toString().equalsIgnoreCase(platform)) {
                return ResponseEntity.status(400).body(null);
            }
            session.setAttribute("member", existingMember);
            return ResponseEntity.ok(existingMember);
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
        return ResponseEntity.ok(savedMember);
    }

    @PostMapping("/set-nickname")
    @ResponseBody
    public ResponseEntity<Member> setNickname(@RequestBody Map<String, String> payload, HttpSession session) {
        Member member = (Member) session.getAttribute("member");
        if (member == null) {
            return ResponseEntity.status(401).body(null);
        }

        String nickname = payload.get("nickname");
        member.setMemberUsername(nickname);

        try {
            memberService.updateMemberUsername(member.getMemberId(), nickname);
            session.setAttribute("member", member);
            return ResponseEntity.ok(member);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/logout")
    @ResponseBody
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("logged out");
    }
}
