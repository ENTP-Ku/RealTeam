package com.example.demo;

// Spring Data JPA의 JpaRepository를 사용하여 데이터베이스 접근을 처리합니다.
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// JPA Repository를 정의하는 인터페이스입니다. User 엔티티에 대한 CRUD 작업을 처리합니다.
@Repository // 이 인터페이스가 Spring의 Repository 컴포넌트임을 명시합니다.
public interface UserRepository extends JpaRepository<User, Long> {
    // 특정 employeeId가 이미 존재하는지 확인합니다.
    boolean existsByEmployeeId(String employeeId);

    // 특정 username이 이미 존재하는지 확인합니다.
    boolean existsByUsername(String username);

    // username을 기준으로 User 객체를 검색합니다.
    User findByUsername(String username);
}
