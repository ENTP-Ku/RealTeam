package com.example.demo;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디 입니다.");
        }
        if (userRepository.findByUniqueNumber(user.getUniqueNumber()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 가입되어있습니다.");
        }
        userRepository.save(user);
        return ResponseEntity.ok("환영합니다. 로그인 후 이용해주세요");
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        Optional<User> foundUser = userRepository.findByUsername(user.getUsername());
        if (foundUser.isEmpty()) {
            return ResponseEntity.badRequest().body("등록되지 않은 아이디 입니다.");
        }
        if (!foundUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.badRequest().body("비밀번호가 맞지않습니다.");
        }
        // 로그인 성공 로직
        return ResponseEntity.ok("로그인 성공");
    }
}
