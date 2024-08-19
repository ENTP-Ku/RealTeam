package com.example.demo;

import org.springframework.boot.SpringApplication; // Spring Boot 애플리케이션을 실행하는 클래스입니다.
import org.springframework.boot.autoconfigure.SpringBootApplication; // Spring Boot 애플리케이션 설정을 자동으로 구성합니다.

@SpringBootApplication // Spring Boot 애플리케이션을 설정하는 메인 클래스임을 나타냅니다.
public class DemoApplication {

    // 애플리케이션의 메인 메서드입니다.
    public static void main(String[] args) {
        // Spring Boot 애플리케이션을 실행합니다.
        SpringApplication.run(DemoApplication.class, args);
    }

}
