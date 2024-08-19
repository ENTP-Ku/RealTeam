package com.example.demo;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; // 사용자 인증을 위한 토큰 클래스입니다.
import org.springframework.security.core.context.SecurityContextHolder; // 현재 보안 컨텍스트를 저장하는 클래스입니다.
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // 기본 사용자 이름 및 비밀번호 인증 필터입니다.

import jakarta.servlet.FilterChain; // 서블릿 필터 체인 클래스입니다.
import jakarta.servlet.ServletException; // 서블릿 예외 클래스입니다.
import jakarta.servlet.ServletRequest; // 서블릿 요청 인터페이스입니다.
import jakarta.servlet.ServletResponse; // 서블릿 응답 인터페이스입니다.
import jakarta.servlet.http.HttpServletRequest; // HTTP 요청 인터페이스입니다.

import java.io.IOException; // 입출력 예외 클래스입니다.

public class JwtTokenFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtTokenProvider jwtTokenProvider; // JWT 토큰을 처리하는 JwtTokenProvider 클래스

    // JwtTokenProvider를 주입받는 생성자
    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // 요청을 필터링하고 처리하는 메서드
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request; // ServletRequest를 HttpServletRequest로 캐스팅
        String token = httpRequest.getHeader("Authorization"); // 요청 헤더에서 Authorization 값을 가져옴
        
        // 디버깅 로그: 받은 토큰을 출력
        System.out.println("Received token: " + token);

        if (token != null && token.startsWith("Bearer ")) { // 토큰이 존재하고 Bearer로 시작하는지 확인
            token = token.substring(7); // "Bearer " 접두사를 제거하고 실제 토큰만 추출
            if (jwtTokenProvider.validateToken(token)) { // 토큰 유효성 검증
                String username = jwtTokenProvider.getUsernameFromToken(token); // 토큰에서 사용자 이름 추출
                // SecurityContext에 인증 정보를 설정
                SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(username, null, null));
                // 디버깅 로그: 토큰이 성공적으로 검증되었음을 출력
                System.out.println("Token validated successfully. Username: " + username);
            } else {
                // 디버깅 로그: 토큰 검증 실패 시 출력
                System.out.println("Token validation failed.");
            }
        } else {
            // 디버깅 로그: 토큰이 없거나 Bearer로 시작하지 않을 경우 출력
            System.out.println("Token is missing or does not start with Bearer.");
        }

        chain.doFilter(request, response); // 필터 체인에서 다음 필터로 요청을 전달
    }
}
