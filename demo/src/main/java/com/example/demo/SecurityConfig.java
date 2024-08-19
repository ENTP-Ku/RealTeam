package com.example.demo;

import org.springframework.context.annotation.Bean; // Spring의 Bean을 정의하기 위한 어노테이션입니다.
import org.springframework.context.annotation.Configuration; // Spring의 설정 클래스를 정의하는 어노테이션입니다.
import org.springframework.security.config.annotation.web.builders.HttpSecurity; // HTTP 보안 구성을 위한 클래스입니다.
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // 웹 보안을 활성화하는 어노테이션입니다.
import org.springframework.security.config.http.SessionCreationPolicy; // 세션 생성 정책을 설정하는 클래스입니다.
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // 비밀번호 암호화를 위한 BCrypt 구현체입니다.
import org.springframework.security.crypto.password.PasswordEncoder; // 비밀번호 암호화 인터페이스입니다.
import org.springframework.security.web.SecurityFilterChain; // 보안 필터 체인을 정의하는 클래스입니다.
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // 사용자 이름과 비밀번호 인증 필터입니다.

@Configuration // 이 클래스가 Spring 설정 클래스임을 명시합니다.
@EnableWebSecurity // Spring Security를 활성화합니다.
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider; // JWT 토큰 공급자를 주입받기 위한 필드

    // 생성자 주입을 통해 JwtTokenProvider를 초기화합니다.
    public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // SecurityFilterChain을 정의하여 HTTP 보안 구성을 설정합니다.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션을 사용하지 않도록 설정 (STATLESS)
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/login", "/api/create").permitAll() // 로그인 및 생성 요청은 인증 없이 허용
                .anyRequest().authenticated()) // 나머지 모든 요청은 인증 필요
            .addFilterBefore(new JwtTokenFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class); // JWT 토큰 필터를 사용자 이름과 비밀번호 인증 필터 앞에 추가

        return http.build(); // 보안 필터 체인을 빌드하여 반환합니다.
    }

    // 비밀번호 암호화를 위한 PasswordEncoder Bean을 정의합니다.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCrypt 암호화 방식 사용
    }
}
