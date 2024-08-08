package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(UserDTO userDTO) throws Exception {
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            throw new Exception("비밀번호가 일치하지 않습니다.");
        }
        if (userRepository.findById(userDTO.getId()).isPresent()) {
            throw new Exception("이미 존재하는 아이디 입니다.");
        }
        if (userRepository.findByUniqueNumber(userDTO.getUniqueNumber()).isPresent()) {
            throw new Exception("이미 가입되어있습니다.");
        }
        User user = new User();
        user.setId(userDTO.getId());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setUniqueNumber(userDTO.getUniqueNumber());
        userRepository.save(user);
    }

    public User authenticate(String id, String password) throws Exception {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new Exception("등록되지않은 아이디 입니다."));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("비밀번호가 맞지않습니다.");
        }
        return user;
    }
}
