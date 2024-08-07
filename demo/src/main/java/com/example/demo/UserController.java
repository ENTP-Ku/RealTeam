package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController // REST API 컨트롤러로 설정
@RequestMapping("/api/users") // URL 매핑 설정
@CrossOrigin(origins = "http://localhost:3000") // CORS 설정
public class UserController {

    @Autowired // 의존성 주입
    private UserService userService;

    @Autowired // 의존성 주입
    private UserRepository userRepository;

    @Autowired // 의존성 주입
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register") // POST 요청 매핑
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.registerUser(userDTO)); // 사용자 등록 처리 후 응답 반환
    }

    @PostMapping("/login") // POST 요청 매핑
    public ResponseEntity<String> loginUser(@RequestBody UserDTO userDTO) {
        User user = userRepository.findByUsername(userDTO.getUsername()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("등록되지않은 아이디 입니다.");
        }
        if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("비밀번호가 맞지않습니다.");
        }
        return ResponseEntity.ok("로그인 성공");
    }
}
