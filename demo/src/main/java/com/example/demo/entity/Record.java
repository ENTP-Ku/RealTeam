package com.example.demo.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data // Lombok 어노테이션으로 getter, setter 자동 생성
@Entity
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private LocalDateTime createdDate;
    private String username;
}
