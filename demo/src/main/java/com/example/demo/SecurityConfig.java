package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and() // CORS 설정 활성화
            .csrf().disable() // CSRF 비활성화
            .authorizeRequests()
                .antMatchers("/api/users/login", "/api/users/register").permitAll() // 로그인 및 회원가입은 누구나 접근 가능
                .anyRequest().authenticated() // 나머지 요청은 인증된 사용자만 접근 가능
            .and()
            .formLogin()
                .loginPage("/login") // 로그인 페이지 URL
                .permitAll()
            .and()
            .logout()
                .permitAll()
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED); // 세션 생성 정책
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 비밀번호 암호화
    }
}
