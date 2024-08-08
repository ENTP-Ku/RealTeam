package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public String registerUser(UserDTO userDTO) {
        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            return "비밀번호가 일치하지 않습니다.";
        }

        // 사용자 이름 중복 확인
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            return "이미 존재하는 아이디 입니다.";
        }

        // 고유번호 중복 확인
        if (userRepository.findByUniqueId(userDTO.getUniqueId()).isPresent()) {
            return "이미 가입되어있습니다";
        }

        // 비밀번호 암호화
        String encodedPassword = bCryptPasswordEncoder.encode(userDTO.getPassword());

        // 새로운 사용자 생성
        User user = new User(userDTO.getUsername(), encodedPassword, userDTO.getUniqueId());

        // 사용자 저장
        userRepository.save(user);
        return "환영합니다. 로그인 후 이용해주세요";
    }

    public boolean loginUser(UserDTO userDTO) {
        // 사용자 이름으로 사용자 검색
        Optional<User> userOptional = userRepository.findByUsername(userDTO.getUsername());

        // 사용자 존재 여부 확인
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // 비밀번호 확인
            return bCryptPasswordEncoder.matches(userDTO.getPassword(), user.getPassword());
        }
        return false; // 사용자 존재하지 않음
    }
}
