package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .antMatchers("/login", "/create").permitAll() // 로그인 및 회원가입 페이지는 인증 없이 접근 가능
            .antMatchers("/welcome", "/write", "/detail/**").authenticated() // 나머지 페이지는 인증 필요
            .and()
            .formLogin()
            .loginPage("/login")
            .defaultSuccessUrl("/welcome", true)
            .permitAll()
            .and()
            .logout()
            .logoutSuccessUrl("/login")
            .permitAll();
    }
}
