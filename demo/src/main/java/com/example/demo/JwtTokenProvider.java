package com.example.demo;

import org.springframework.beans.factory.annotation.Value; // Spring의 @Value 어노테이션을 사용하여 프로퍼티 값을 주입받습니다.
import org.springframework.stereotype.Component; // 이 클래스가 Spring의 컴포넌트임을 명시합니다.
import io.jsonwebtoken.Claims; // JWT Claims를 처리하기 위한 클래스입니다.
import io.jsonwebtoken.Jwts; // JWT 생성 및 파싱을 위한 유틸리티 클래스입니다.
import io.jsonwebtoken.SignatureAlgorithm; // JWT 서명 알고리즘을 정의하는 클래스입니다.

import java.util.Date; // Java의 Date 클래스를 가져옵니다.

@Component // 이 클래스가 Spring의 컴포넌트로 관리되도록 합니다.
public class JwtTokenProvider {

    @Value("${jwt.secret}") // application.properties 또는 application.yml에서 jwt.secret 값을 주입받습니다.
    private String secretKey; // JWT 서명에 사용되는 비밀 키입니다.

    @Value("${jwt.expiration}") // application.properties 또는 application.yml에서 jwt.expiration 값을 주입받습니다.
    private long expiration; // JWT 토큰의 만료 시간(밀리초 단위)입니다.

    // 사용자 이름을 기반으로 JWT 토큰을 생성하는 메서드입니다.
    public String createToken(String username) {
        Date now = new Date(); // 현재 시간을 가져옵니다.
        return Jwts.builder() // JWT 빌더를 사용하여 새로운 JWT를 생성합니다.
                .setSubject(username) // 토큰의 주제로 사용자 이름을 설정합니다.
                .setIssuedAt(now) // 토큰 발급 시간을 현재 시간으로 설정합니다.
                .setExpiration(new Date(now.getTime() + expiration)) // 토큰 만료 시간을 설정합니다.
                .signWith(SignatureAlgorithm.HS512, secretKey) // HS512 알고리즘과 비밀 키로 서명합니다.
                .compact(); // 토큰을 문자열로 변환합니다.
    }

    // JWT 토큰에서 사용자 이름을 추출하는 메서드입니다.
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser() // JWT 파서를 사용하여 토큰을 파싱합니다.
                .setSigningKey(secretKey) // 비밀 키를 설정하여 서명 검증을 합니다.
                .parseClaimsJws(token) // JWT를 파싱하여 Claims 객체를 가져옵니다.
                .getBody(); // Claims 객체의 본문을 가져옵니다.

        return claims.getSubject(); // Claims에서 사용자 이름을 반환합니다.
    }

    // JWT 토큰의 유효성을 검사하는 메서드입니다.
    public boolean validateToken(String token) {
        try {
            Jwts.parser() // JWT 파서를 사용하여 토큰을 파싱합니다.
                .setSigningKey(secretKey) // 비밀 키를 설정하여 서명 검증을 합니다.
                .parseClaimsJws(token); // JWT를 파싱하여 Claims 객체를 가져옵니다.
            return true; // 예외가 발생하지 않으면 유효한 토큰으로 간주합니다.
        } catch (Exception e) {
            return false; // 예외가 발생하면 유효하지 않은 토큰으로 간주합니다.
        }
    }
}
