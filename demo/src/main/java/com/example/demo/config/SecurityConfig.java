package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests((requests) -> requests
                .antMatchers("/login", "/register").permitAll()  // 로그인과 회원가입 페이지는 인증 없이 접근 가능
                .anyRequest().authenticated()  // 다른 모든 요청은 인증된 사용자만 접근 가능
            )
            .formLogin().loginPage("/login").permitAll()  // 로그인 페이지는 인증 없이 접근 가능
            .defaultSuccessUrl("/welcome", true)  // 로그인 성공 시 리다이렉트할 URL
            .failureUrl("/login?error=true")  // 로그인 실패 시 리다이렉트할 URL
            .and()
            .logout().permitAll();  // 로그아웃 페이지는 인증 없이 접근 가능
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();  // 비밀번호 암호화를 위한 Bean
    }
}
