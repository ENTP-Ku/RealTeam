package com.example.demo;

import java.util.ArrayList; // 빈 ArrayList를 사용하기 위한 import

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 import
import org.springframework.security.core.userdetails.UserDetails; // UserDetails를 구현하기 위한 import
import org.springframework.security.core.userdetails.UserDetailsService; // UserDetailsService 인터페이스를 구현하기 위한 import
import org.springframework.security.core.userdetails.UsernameNotFoundException; // 사용자 찾기 실패 예외를 위한 import
import org.springframework.stereotype.Service; // 서비스 클래스를 표시하기 위한 import

@Service // 이 클래스가 Spring의 서비스 컴포넌트임을 나타냅니다.
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository; // User 엔티티를 처리할 리포지토리 주입

    /**
     * 주어진 사용자 이름으로 사용자를 조회하여 UserDetails 객체를 반환합니다.
     * @param username 사용자 이름
     * @return 사용자 이름과 비밀번호를 포함하는 UserDetails 객체
     * @throws UsernameNotFoundException 사용자를 찾을 수 없는 경우 예외 발생
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 사용자 이름으로 User 엔티티 조회
        User user = userRepository.findByUsername(username);
        if (user == null) {
            // 사용자를 찾지 못한 경우 예외 발생
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        // User 엔티티를 UserDetails 객체로 변환하여 반환
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>()); // 빈 권한 리스트를 사용
    }
}
