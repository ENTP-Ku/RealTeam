package com.example.demo;

import lombok.Getter; // Lombok의 Getter 어노테이션을 사용하여 모든 필드에 대한 getter 메서드를 자동 생성합니다.
import lombok.Setter; // Lombok의 Setter 어노테이션을 사용하여 모든 필드에 대한 setter 메서드를 자동 생성합니다.
import lombok.NoArgsConstructor; // Lombok의 NoArgsConstructor 어노테이션을 사용하여 기본 생성자를 자동 생성합니다.
import lombok.AllArgsConstructor; // Lombok의 AllArgsConstructor 어노테이션을 사용하여 모든 필드를 매개변수로 하는 생성자를 자동 생성합니다.
import jakarta.persistence.*; // JPA 관련 어노테이션과 클래스를 가져옵니다.
import java.util.Date; // Java의 Date 클래스를 가져옵니다.

// JPA 엔티티 클래스입니다.
@Entity
@Getter // 모든 필드에 대한 getter 메서드를 자동 생성합니다.
@Setter // 모든 필드에 대한 setter 메서드를 자동 생성합니다.
@NoArgsConstructor // 기본 생성자를 자동 생성합니다.
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자를 자동 생성합니다.
public class Record {

    @Id // 기본 키를 나타냅니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 값을 자동 생성하는 전략을 설정합니다.
    private Long id; // 레코드의 고유 ID 필드

    private String title; // 레코드 제목 필드
    
    private String content; // 레코드 내용 필드
    
    private String username; // 레코드를 작성한 사용자의 이름 필드
    
    private Date date; // 레코드 작성 날짜 필드

    // title, content, username, date 필드를 매개변수로 하는 생성자를 수동으로 추가합니다.
    public Record(String title, String content, String username, Date date) {
        this.title = title; // 제목 초기화
        this.content = content; // 내용 초기화
        this.username = username; // 사용자 이름 초기화
        this.date = date; // 날짜 초기화
    }

    // ID만 초기화하는 생성자를 수동으로 추가합니다.
    public Record(Long id) {
        this.id = id; // ID 초기화
    }
}
