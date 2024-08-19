package com.example.demo;

import lombok.Getter; // Lombok의 Getter 어노테이션을 사용하여 모든 필드에 대한 getter 메서드를 자동 생성합니다.
import lombok.Setter; // Lombok의 Setter 어노테이션을 사용하여 모든 필드에 대한 setter 메서드를 자동 생성합니다.

@Getter // 모든 필드에 대한 getter 메서드를 자동 생성합니다.
@Setter // 모든 필드에 대한 setter 메서드를 자동 생성합니다.
public class CommentDTO {

    private Long id; // 댓글의 고유 ID
    private String content; // 댓글 내용
    private String username; // 댓글 작성자의 사용자 이름

    // Comment 객체를 기반으로 CommentDTO를 생성하는 생성자
    public CommentDTO(Comment comment) {
        this.id = comment.getId(); // 댓글의 ID를 가져와서 설정
        this.content = comment.getContent(); // 댓글의 내용을 가져와서 설정
        this.username = comment.getUser().getUsername(); // 댓글 작성자의 사용자 이름을 가져와서 설정
    }
}
