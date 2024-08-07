package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // 설정 클래스
@EnableWebSecurity // Spring Security 활성화
public class SecurityConfig {

    @Bean // Spring Bean으로 등록
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // CSRF 보호 비활성화
            .authorizeRequests()
                .antMatchers("/api/users/register", "/api/users/login").permitAll() // 특정 경로 접근 허용
                .anyRequest().authenticated() // 그 외의 모든 요청은 인증 필요
            .and()
            .formLogin()
                .loginPage("/api/users/login") // 로그인 페이지 설정
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED); // 세션 생성 정책 설정

        return http.build();
    }

    @Bean // Spring Bean으로 등록
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCryptPasswordEncoder 사용
    }
}
