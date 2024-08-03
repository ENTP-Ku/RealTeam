package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            return "비밀번호가 일치하지 않습니다.";
        }
        if (userService.findByUsername(user.getUsername()) != null) {
            return "이미 존재하는 아이디 입니다.";
        }
        if (userService.findByUniqueCode(user.getUniqueCode()) != null) {
            return "이미 가입되어있습니다";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.registerUser(user);
        return "환영합니다. 로그인 후 이용해주세요";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser == null) {
            return "등록되지않은 아이디 입니다.";
        }
        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return "비밀번호가 맞지않습니다.";
        }
        // 로그인 처리 (세션/토큰 등)
        return "로그인 성공";
    }
}
