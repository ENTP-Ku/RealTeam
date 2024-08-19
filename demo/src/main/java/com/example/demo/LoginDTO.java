package com.example.demo;

import lombok.Getter; // Lombok의 Getter 어노테이션을 사용하여 모든 필드에 대한 getter 메서드를 자동 생성합니다.
import lombok.Setter; // Lombok의 Setter 어노테이션을 사용하여 모든 필드에 대한 setter 메서드를 자동 생성합니다.
import lombok.NoArgsConstructor; // Lombok의 NoArgsConstructor 어노테이션을 사용하여 기본 생성자를 자동 생성합니다.
import lombok.AllArgsConstructor; // Lombok의 AllArgsConstructor 어노테이션을 사용하여 모든 필드를 매개변수로 하는 생성자를 자동 생성합니다.

@Getter // 모든 필드에 대한 getter 메서드를 자동 생성합니다.
@Setter // 모든 필드에 대한 setter 메서드를 자동 생성합니다.
@NoArgsConstructor // 기본 생성자를 자동 생성합니다.
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자를 자동 생성합니다.
public class LoginDTO {
    private String username; // 사용자 이름 필드

    private String password; // 비밀번호 필드
}
