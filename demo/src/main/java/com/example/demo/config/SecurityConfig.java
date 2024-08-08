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
                .antMatchers("/api/users/register", "/api/users/login").permitAll() // 누구나 접근 가능
                .anyRequest().authenticated() // 로그인된 사용자만 접근 가능
            )
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // 세션 유지
            .and()
            .formLogin().loginPage("/login").permitAll()
            .and()
            .logout().permitAll();
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder(); // 비밀번호 암호화를 위한 Bean
    }
}
