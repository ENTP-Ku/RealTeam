package com.example.yourapp.controller;

import com.example.yourapp.entity.User;
import com.example.yourapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody User user) {
        System.out.println("Request received: " + user); // 요청 로그 남기기

        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        Optional<User> existingUniqueCode = userRepository.findByUniqueCode(user.getUniqueCode());

        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }

        if (existingUniqueCode.isPresent()) {
            return ResponseEntity.badRequest().body("Unique code already used.");
        }

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        System.out.println("Login request received: " + user); // 요청 로그 남기기

        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok("Login successful");
        }

        return ResponseEntity.badRequest().body("Invalid username or password");
    }
}

