package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.config.JwtUtil; // JwtUtil 클래스 임포트
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtUtil jwtUtil; // JwtUtil 주입

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody User user) {
		System.out.println("Received User: " + user); // 요청된 사용자 데이터 로그 출력

		Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
		if (existingUser.isPresent()) {
			return ResponseEntity.badRequest().body("이미 존재하는 아이디 입니다.");
		}

		Optional<User> existingUniqueNumber = userRepository.findByUniqueNumber(user.getUniqueNumber());
		if (existingUniqueNumber.isPresent()) {
			return ResponseEntity.badRequest().body("이미 가입되어있습니다");
		}

		if (!user.getPassword().equals(user.getConfirmPassword())) {
			return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
		}

		userRepository.save(user);
		return ResponseEntity.ok("환영합니다. 로그인 후 이용해주세요");
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user) {
		System.out.println("Received login User: " + user); // 로그인 요청 데이터 로그 출력

		Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
		if (!existingUser.isPresent()) {
			return ResponseEntity.badRequest().body("등록되지 않은 아이디 입니다.");
		}

		User foundUser = existingUser.get();
		if (!foundUser.getPassword().equals(user.getPassword())) {
			return ResponseEntity.badRequest().body("비밀번호가 맞지않습니다.");
		}

		// JWT 토큰 생성
		String token = jwtUtil.generateToken(foundUser.getUsername());
		

		System.out.println(token);
		// JWT 토큰을 클라이언트에 반환
		return ResponseEntity.ok(token);

	}

}
