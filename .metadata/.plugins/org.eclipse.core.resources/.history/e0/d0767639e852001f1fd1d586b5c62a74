package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Configuration
    public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
        
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                .authorizeRequests()
                    .antMatchers("/api/login", "/api/create").permitAll() // 인증 없이 접근 가능한 API
                    .antMatchers("/welcome", "/write", "/detail/**").authenticated() // 인증이 필요한 페이지
                    .and()
                .csrf().disable() // CSRF 비활성화
                .formLogin()
                    .loginPage("/login") // 로그인 페이지 설정
                    .permitAll()
                    .defaultSuccessUrl("/welcome", true) // 로그인 성공 후 리다이렉트 URL
                    .failureUrl("/login?error=true") // 로그인 실패 시 리다이렉트 URL
                    .and()
                .logout()
                    .logoutUrl("/logout") // 로그아웃 URL
                    .logoutSuccessUrl("/login") // 로그아웃 후 리다이렉트 URL
                    .permitAll();
        }
    }
}
