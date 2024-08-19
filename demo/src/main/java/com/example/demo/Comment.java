package com.example.demo;

import lombok.Getter; // Lombok의 Getter 어노테이션을 사용하여 모든 필드에 대한 getter 메서드를 자동 생성합니다.
import lombok.Setter; // Lombok의 Setter 어노테이션을 사용하여 모든 필드에 대한 setter 메서드를 자동 생성합니다.
import lombok.NoArgsConstructor; // Lombok의 NoArgsConstructor 어노테이션을 사용하여 기본 생성자를 자동 생성합니다.
import lombok.AllArgsConstructor; // Lombok의 AllArgsConstructor 어노테이션을 사용하여 모든 필드를 매개변수로 하는 생성자를 자동 생성합니다.
import jakarta.persistence.*; // JPA 엔티티를 정의하는 데 필요한 어노테이션과 클래스를 가져옵니다.

@Entity // 이 클래스가 JPA 엔티티임을 나타냅니다.
@Getter // 모든 필드에 대한 getter 메서드를 자동 생성합니다.
@Setter // 모든 필드에 대한 setter 메서드를 자동 생성합니다.
@NoArgsConstructor // 기본 생성자를 자동 생성합니다.
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자를 자동 생성합니다.
public class Comment {

    @Id // 이 필드가 엔티티의 기본 키임을 나타냅니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 값을 자동으로 생성합니다.
    private Long id; // 댓글의 고유 ID

    private String content; // 댓글 내용

    @ManyToOne // 이 엔티티가 다대일 관계를 가짐을 나타냅니다.
    @JoinColumn(name = "user_id") // "user_id" 컬럼을 통해 User 테이블과 조인합니다.
    private User user; // 댓글 작성자

    @ManyToOne // 이 엔티티가 다대일 관계를 가짐을 나타냅니다.
    @JoinColumn(name = "record_id") // "record_id" 컬럼을 통해 Record 테이블과 조인합니다.
    private Record record; // 댓글이 달린 게시글
}
