package com.example.demo;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        String result = userService.createUser(userDTO);
        if (result.equals("createSuccess")) {
            return ResponseEntity.ok().body(Map.of("createSuccess", "환영합니다!!!"));
        } else {
            return ResponseEntity.ok().body(Map.of("createError", result));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        String result = userService.loginUser(loginDTO);

        if (result != null && result.split("\\.").length == 3) {
            // Simple check: JWTs typically have three parts separated by dots
            return ResponseEntity.ok().body(Map.of("token", result));
        } else {
            return ResponseEntity.ok().body(Map.of("loginError", result));
        }
    }

}
