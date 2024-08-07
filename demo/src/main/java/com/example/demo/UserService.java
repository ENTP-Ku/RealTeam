package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // PasswordEncoder 임포트
import org.springframework.stereotype.Service;

@Service // 서비스 계층으로 설정
public class UserService {

    @Autowired // 의존성 주입
    private UserRepository userRepository;

    @Autowired // 의존성 주입
    private PasswordEncoder passwordEncoder; // PasswordEncoder 주입

    public String registerUser(UserDTO userDTO) {
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            return "비밀번호가 일치하지 않습니다.";
        }
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            return "이미 존재하는 아이디 입니다.";
        }
        if (userRepository.findByUniqueNumber(userDTO.getUniqueNumber()).isPresent()) {
            return "이미 가입되어있습니다";
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // 비밀번호 암호화
        user.setUniqueNumber(userDTO.getUniqueNumber());

        userRepository.save(user); // 데이터베이스에 사용자 저장
        return "환영합니다. 로그인 후 이용해주세요";
    }
}
