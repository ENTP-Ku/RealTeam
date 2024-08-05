package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
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
	        .authorizeRequests()
	            .antMatchers("/login", "/create", "/api/login", "/api/create").permitAll()
	            .antMatchers("/welcome", "/write", "/detail/**").authenticated()
	            .and()
	        .csrf().disable()
	        .formLogin()
	            .loginPage("/login")
	            .permitAll()
	            .defaultSuccessUrl("/welcome", true)
	            .failureUrl("/login?error=true")
	            .and()
	        .logout()
	            .logoutUrl("/logout")
	            .logoutSuccessUrl("/login")
	            .permitAll()
	            .and()
	        .sessionManagement()
	            .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
	            .sessionFixation().none()  // 세션 고정 보호 비활성화 (테스트 용도)
	            .maximumSessions(1)
	            .expiredUrl("/login?expired");
	}


    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
