package com.example.demo;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "Record") // MySQL의 테이블 이름을 'Record'로 설정
@Data // Lombok을 사용하여 getter, setter, toString, equals, hashCode 메서드를 자동으로 생성
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private LocalDateTime createdDate;
    private String username;
}
