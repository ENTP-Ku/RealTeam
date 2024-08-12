package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public String createUser(UserDTO userDTO) {
        if (userRepository.existsByEmployeeId(userDTO.getEmployeeId())) {
            return "이미 가입했습니다.";
        } else if (userRepository.existsByUsername(userDTO.getUsername())) {
            return "이미 존재하는 아이디입니다.";
        } else {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            User user = new User(userDTO.getUsername(), encoder.encode(userDTO.getPassword()), userDTO.getEmployeeId());
            userRepository.save(user);
            return "createSuccess";
        }
    }

    public String loginUser(LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getUsername());
        if (user == null) {
            return "존재하지 않는 아이디입니다.";
        } else if (!new BCryptPasswordEncoder().matches(loginDTO.getPassword(), user.getPassword())) {
            return "비밀번호가 일치하지 않습니다.";
        } else {
            return jwtTokenProvider.createToken(user.getUsername());
        }
    }
}
