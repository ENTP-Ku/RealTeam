package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 어노테이션입니다.
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // 비밀번호 암호화를 위한 클래스입니다.
import org.springframework.stereotype.Service; // 서비스 클래스를 정의하는 어노테이션입니다.

// 비즈니스 로직을 처리하는 서비스 클래스입니다.
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository; // 사용자 정보에 접근하기 위한 레포지토리

    @Autowired
    private JwtTokenProvider jwtTokenProvider; // JWT 토큰을 생성하기 위한 컴포넌트

    // 사용자 생성 메서드
    public String createUser(UserDTO userDTO) {
        // 이미 동일한 employeeId를 가진 사용자가 존재하는지 확인
        if (userRepository.existsByEmployeeId(userDTO.getEmployeeId())) {
            return "이미 가입했습니다."; // 존재하는 경우
        } 
        // 이미 동일한 username을 가진 사용자가 존재하는지 확인
        else if (userRepository.existsByUsername(userDTO.getUsername())) {
            return "이미 존재하는 아이디입니다."; // 존재하는 경우
        } 
        // 사용자가 존재하지 않으면 새 사용자 생성
        else {
            // 비밀번호 암호화를 위한 BCryptPasswordEncoder 인스턴스 생성
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            // User 객체 생성 (비밀번호는 암호화됨)
            User user = new User(userDTO.getUsername(), encoder.encode(userDTO.getPassword()), userDTO.getEmployeeId());
            // 사용자 정보를 데이터베이스에 저장
            userRepository.save(user);
            return "createSuccess"; // 성공 메시지 반환
        }
    }

    // 사용자 로그인 메서드
    public String loginUser(LoginDTO loginDTO) {
        // username을 기반으로 사용자 조회
        User user = userRepository.findByUsername(loginDTO.getUsername());
        // 사용자가 존재하지 않으면 오류 메시지 반환
        if (user == null) {
            return "존재하지 않는 아이디입니다.";
        } 
        // 비밀번호가 일치하지 않으면 오류 메시지 반환
        else if (!new BCryptPasswordEncoder().matches(loginDTO.getPassword(), user.getPassword())) {
            return "비밀번호가 일치하지 않습니다.";
        } 
        // 비밀번호가 일치하면 JWT 토큰 생성 및 반환
        else {
            return jwtTokenProvider.createToken(user.getUsername());
        }
    }
}
