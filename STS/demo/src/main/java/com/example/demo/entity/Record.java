package com.example.demo.entity;

import lombok.Data; // Lombok의 @Data 어노테이션을 임포트
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data // @Getter, @Setter, @ToString, @EqualsAndHashCode 등을 자동으로 생성
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 글번호

    private String title;  // 제목

    private String content;  // 내용

    private LocalDateTime createdDate;  // 작성날짜

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // 작성자
}
