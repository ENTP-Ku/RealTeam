package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입을 위한 어노테이션입니다.
import org.springframework.stereotype.Service; // 서비스 클래스를 정의하는 어노테이션입니다.
import org.springframework.transaction.annotation.Transactional; // 트랜잭션 관리를 위한 어노테이션입니다.
import java.util.Date; // Java의 Date 클래스를 가져옵니다.
import java.util.List; // Java의 List 클래스를 가져옵니다.
import java.util.stream.Collectors; // Java의 스트림 API를 사용하여 컬렉션을 변환합니다.

// 비즈니스 로직을 처리하는 서비스 클래스입니다.
@Service
public class RecordService {

    @Autowired
    private RecordRepository recordRepository; // RecordRepository를 주입받아 데이터베이스 접근을 처리합니다.

    @Autowired
    private CommentRepository commentRepository; // CommentRepository를 주입받아 댓글 관련 작업을 처리합니다.

    /**
     * 주어진 게시글 정보와 사용자 이름을 바탕으로 게시글을 저장하는 메서드
     * @param recordDTO 게시글 정보를 담은 DTO
     * @param username 게시글 작성자의 사용자 이름
     */
    public void saveRecord(RecordDTO recordDTO, String username) {
        // DTO로부터 정보를 받아 Record 객체를 생성하고, 현재 날짜와 함께 저장합니다.
        Record record = new Record(recordDTO.getTitle(), recordDTO.getContent(), username, new Date());
        recordRepository.save(record); // 게시글을 데이터베이스에 저장합니다.
    }

    /**
     * 모든 게시글을 가져와서 DTO 리스트로 변환하여 반환하는 메서드
     * 최신 게시글이 가장 위에 오도록 내림차순 정렬
     * @return 모든 게시글의 DTO 리스트
     */
    public List<RecordDTO> getAllRecords() {
        // 데이터베이스에서 모든 Record 객체를 날짜 기준으로 내림차순으로 정렬한 후 가져와서 DTO로 변환하여 리스트로 반환합니다.
        return recordRepository.findAllByOrderByDateDesc().stream()
                .map(record -> new RecordDTO(record.getId(), record.getTitle(), record.getUsername(), record.getDate(), record.getContent()))
                .collect(Collectors.toList());
    }

    /**
     * 특정 ID에 해당하는 게시글을 가져와 DTO로 변환하여 반환하는 메서드
     * @param id 게시글의 ID
     * @return 해당 게시글의 DTO
     */
    public RecordDTO getRecordById(Long id) {
        // 주어진 ID로 게시글을 찾고, DTO로 변환하여 반환합니다.
        Record record = recordRepository.findById(id).orElseThrow(); // 해당 ID가 없으면 예외 발생
        return new RecordDTO(record.getId(), record.getTitle(), record.getUsername(), record.getDate(), record.getContent());
    }

    /**
     * 주어진 ID에 해당하는 게시글을 삭제하는 메서드
     * 게시글 작성자와 로그인한 사용자가 동일할 때만 삭제 가능
     * @param id 게시글의 ID
     * @param username 현재 로그인한 사용자의 이름
     * @return 삭제 성공 또는 실패 메시지
     */
    @Transactional // 데이터베이스 트랜잭션을 관리합니다.
    public String deleteRecord(Long id, String username) {
        // 게시글을 ID로 찾고, 존재하지 않으면 예외 발생
        Record record = recordRepository.findById(id).orElseThrow();
        
        // 게시글 작성자와 로그인한 사용자가 동일한 경우에만 삭제를 허용합니다.
        if (record.getUsername().equals(username)) {
            // 해당 게시글에 달린 모든 댓글을 먼저 삭제합니다.
            commentRepository.deleteByRecordId(id);
            // 게시글을 삭제합니다.
            recordRepository.delete(record);
            return "deleteSuccess"; // 삭제 성공 메시지를 반환합니다.
        } else {
            return "삭제 권한이 없습니다."; // 권한이 없을 경우의 메시지를 반환합니다.
        }
    }
}
