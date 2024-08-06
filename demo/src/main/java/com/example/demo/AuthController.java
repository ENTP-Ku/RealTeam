package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // 클라이언트 측에서 비밀번호 확인을 처리해야 합니다.
        // 예: 사용자 등록 요청 전에 클라이언트에서 비밀번호 확인 필드를 검증

        // 아이디 중복 체크
        if (userService.findById(user.getId()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디 입니다.");
        }

        // 고유번호 중복 체크
        if (userService.findByUniqueNumber(user.getUniqueNumber()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 가입되어있습니다.");
        }

        userService.registerUser(user);
        return ResponseEntity.ok("환영합니다. 로그인 후 이용해주세요");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        Optional<User> existingUser = userService.findById(user.getId());

        if (existingUser.isEmpty()) {
            return ResponseEntity.badRequest().body("등록되지않은 아이디 입니다.");
        }

        if (!existingUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.badRequest().body("비밀번호가 맞지않습니다.");
        }

        return ResponseEntity.ok("로그인 성공");
    }
}
