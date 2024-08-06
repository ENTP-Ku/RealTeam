package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // CSRF 보호 비활성화 (클라이언트에서 CSRF 토큰 처리 시 활성화 필요)
            .authorizeRequests()
                // 누구나 접근 가능한 URL
                .requestMatchers("/login", "/create").permitAll()
                // 로그인된 사용자만 접근 가능한 URL
                .requestMatchers("/welcome", "/write", "/detail/**").authenticated()
                .anyRequest().authenticated()  // 나머지 요청은 인증 필요
            .and()
            .formLogin()  // 폼 로그인 사용
                .loginPage("/login")  // 로그인 페이지 설정
                .permitAll()
            .and()
            .logout()  // 로그아웃 설정
                .permitAll();
        
        return http.build();
    }
}
