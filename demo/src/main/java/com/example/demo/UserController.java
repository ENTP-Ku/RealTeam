package com.example.demo;

import java.util.Map; // Java의 Map 클래스를 사용합니다.

import org.springframework.beans.factory.annotation.Autowired; // Spring의 의존성 주입을 위한 어노테이션입니다.
import org.springframework.http.ResponseEntity; // HTTP 응답을 처리하기 위한 클래스입니다.
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // BCrypt 암호화 사용을 위한 클래스입니다.
import org.springframework.web.bind.annotation.*; // Spring Web의 REST 컨트롤러 어노테이션을 가져옵니다.

// REST API를 처리하는 컨트롤러 클래스입니다.
@RestController
@RequestMapping("/api") // "/api" 경로로 들어오는 요청을 처리하는 클래스입니다.
public class UserController {

    @Autowired // UserService 객체를 자동으로 주입합니다.
    private UserService userService; 

    // 사용자 생성 요청을 처리합니다.
    @PostMapping("/create") // "/api/create" 경로로 POST 요청을 처리합니다.
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        // UserService를 호출하여 사용자 생성 로직을 처리합니다.
        String result = userService.createUser(userDTO);

        // 생성 성공 시 "createSuccess" 메시지를 반환합니다.
        if (result.equals("createSuccess")) {
            return ResponseEntity.ok().body(Map.of("createSuccess", "환영합니다!!!"));
        } else {
            // 실패 시 오류 메시지를 반환합니다.
            return ResponseEntity.ok().body(Map.of("createError", result));
        }
    }

    // 사용자 로그인 요청을 처리합니다.
    @PostMapping("/login") // "/api/login" 경로로 POST 요청을 처리합니다.
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        // UserService를 호출하여 로그인 로직을 처리합니다.
        String result = userService.loginUser(loginDTO);

        // JWT 토큰 형식이 맞는지 간단히 검증합니다 (보통 JWT는 점으로 구분된 3부분으로 구성됨).
        if (result != null && result.split("\\.").length == 3) {
            return ResponseEntity.ok().body(Map.of("token", result));
        } else {
            // 로그인 실패 시 오류 메시지를 반환합니다.
            return ResponseEntity.ok().body(Map.of("loginError", result));
        }
    }
}
