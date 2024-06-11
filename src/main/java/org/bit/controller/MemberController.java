package org.bit.controller;

import org.bit.model.Member;
import org.bit.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/social-login")
    @ResponseBody
    public String socialLogin(@RequestBody Member member) {
        Member existingMember = memberService.findByEmail(member.getMemberEmail());
        if (existingMember == null) {
            memberService.registerMember(member);
            return "registered";
        }
        return "logged in";
    }
}
