package org.bit.controller;

import lombok.RequiredArgsConstructor;
import org.bit.model.Member;
import org.bit.model.MemberPlatform;
import org.bit.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;  // Add this import

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/members")
@CrossOrigin(origins = "https://q2beat.vercel.app", allowCredentials = "true")
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
    public ResponseEntity<Map<String, Object>> socialLogin(@RequestBody Map<String, String> payload, HttpSession session) {
        String socialId = payload.get("socialId");
        String platform = payload.get("platform");
        String name = payload.get("name");
        String email = payload.get("email");

        Member existingMember = memberService.findByEmail(email);

        Map<String, Object> response = new HashMap<>();
        if (existingMember != null) {
            if (!existingMember.getMemberPlatform().toString().equalsIgnoreCase(platform)) {
                response.put("status", "error");
                response.put("message", "다른 소셜 로그인으로 등록한 이메일 정보가 존재합니다");
                return ResponseEntity.status(400).body(response);
            }
            session.setAttribute("member", existingMember);

            Member member = (Member) session.getAttribute("member");

            System.out.println("%%%%%%%%%%%%%%%" + member);

            System.out.println("social login success===========================================");

            response.put("status", "success");
            response.put("member", existingMember);
            return ResponseEntity.ok(response);
        }

        Member newMember = Member.builder()
                .memberName(name)
                .memberPlatform(MemberPlatform.valueOf(platform.toUpperCase()))
                .memberUsername(null)
                .memberEmail(email)
                .build();
        memberService.registerMember(newMember);

        Optional<Member> savedMember = Optional.ofNullable(memberService.findByEmail(email));

        System.out.println("is member empty?" + savedMember.isEmpty());

        if (savedMember.isEmpty()) {
            System.out.println("member exists");

            response.put("status", "error");
            response.put("message", "회원 등록에 실패했습니다.");
            return ResponseEntity.status(500).body(response);
        }

        session.setAttribute("member", savedMember.get());
        response.put("status", "success");
        response.put("member", savedMember.get());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/check-nickname")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> checkNickname(@RequestBody Map<String, String> payload) {
        String nickname = payload.get("nickname");
        boolean exists = memberService.nicknameExist(nickname);

        Map<String, Object> response = new HashMap<>();
        response.put("exists", exists);
        if (!exists) {
            response.put("message", "사용 가능한 닉네임입니다.");
        } else {
            response.put("message", "이미 사용 중인 닉네임입니다.");
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/set-nickname")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> setNickname(@RequestBody Map<String, String> payload, HttpSession session) {
        Member member = (Member) session.getAttribute("member");

        System.out.println("%%%%%%%%%%%%%%%" + member);

        if (member == null) {
            return ResponseEntity.status(401).body(Map.of("message", "세션이 만료되었습니다."));
        }

        String nickname = payload.get("nickname");

        if (!nickname.matches("^[가-힣a-zA-Z0-9]+$") || nickname.length() > 8) {
            return ResponseEntity.status(400).body(Map.of("message", "닉네임은 한글, 영문 또는 숫자로만 구성되고, 최대 8자이어야 합니다."));
        }

        if (memberService.nicknameExist(nickname)) {
            return ResponseEntity.status(400).body(Map.of("message", "이미 사용 중인 닉네임입니다."));
        }

        member.setMemberUsername(nickname);
        memberService.updateMemberUsername(member.getMemberId(), nickname);
        session.setAttribute("member", member);

        return ResponseEntity.ok(Map.of("message", "닉네임이 성공적으로 설정되었습니다."));
    }

    @PostMapping("/logout")
    @ResponseBody
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("logged out");
    }
}
