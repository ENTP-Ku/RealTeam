package com.example.demo;

import org.springframework.context.annotation.Bean; // Spring Bean 생성을 위한 어노테이션입니다.
import org.springframework.context.annotation.Configuration; // 설정 클래스를 정의하는 어노테이션입니다.
import org.springframework.web.servlet.config.annotation.CorsRegistry; // CORS 설정을 위한 클래스입니다.
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; // Spring MVC 설정을 위한 인터페이스입니다.

// Spring MVC 설정을 위한 구성 클래스입니다.
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // CORS(교차 출처 리소스 공유) 매핑을 설정합니다.
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 CORS 설정 적용
                .allowedOrigins("http://localhost:3000") // 허용할 오리진 (프론트엔드 URL)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 허용할 헤더
                .allowCredentials(true); // 자격 증명(쿠키 등) 전송 허용
    }
}
