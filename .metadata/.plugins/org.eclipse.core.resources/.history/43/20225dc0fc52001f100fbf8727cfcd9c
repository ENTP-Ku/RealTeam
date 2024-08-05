package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {


	@Override
	protected void configure(HttpSecurity http) throws Exception {
	    http
	        .authorizeRequests()
	            .antMatchers("/login", "/create", "/api/login", "/api/create").permitAll() // 로그인, 회원가입, API 요청은 허용
	            .antMatchers("/welcome", "/write", "/detail/**").authenticated() // 인증된 사용자만 접근할 수 있도록 설정
	            .and()
	        .csrf().disable()
	        .formLogin()
	            .loginPage("/login") // 로그인 페이지 URL 설정
	            .permitAll() // 로그인 페이지는 모든 사용자에게 허용
	            .defaultSuccessUrl("/welcome", true) // 로그인 성공 후 리다이렉트 URL
	            .failureUrl("/login?error=true") // 로그인 실패 시 리다이렉트 URL
	            .and()
	        .logout()
	            .logoutUrl("/logout") // 로그아웃 URL 설정
	            .logoutSuccessUrl("/login") // 로그아웃 성공 후 리다이렉트 URL
	            .permitAll(); // 로그아웃 URL은 모든 사용자에게 허용
	}

    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
