package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username); // 사용자 이름으로 검색
    Optional<User> findByUniqueId(String uniqueId); // 고유번호로 검색
}
