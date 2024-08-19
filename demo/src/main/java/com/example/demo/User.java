package com.example.demo;

// Lombok 어노테이션을 사용하여 자동으로 getter, setter, 생성자 등을 생성합니다.
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

// JPA 엔티티 클래스임을 명시합니다.
@Entity
@Getter // 모든 필드에 대한 getter 메서드를 자동 생성합니다.
@Setter // 모든 필드에 대한 setter 메서드를 자동 생성합니다.
@NoArgsConstructor // 기본 생성자를 자동 생성합니다.
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자를 자동 생성합니다.
public class User {
    
    @Id // 해당 필드가 엔티티의 기본 키임을 나타냅니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 값을 자동 생성하는 전략을 설정합니다.
    private Long id; // 기본 키 필드
    
    private String username; // 사용자 이름 필드
    
    private String password; // 비밀번호 필드
    
    private String employeeId; // 직원 ID 필드

    // id를 제외한 모든 필드를 포함하는 생성자를 명시적으로 추가합니다.
    public User(String username, String password, String employeeId) {
        this.username = username; // username 필드 초기화
        this.password = password; // password 필드 초기화
        this.employeeId = employeeId; // employeeId 필드 초기화
    }
}
