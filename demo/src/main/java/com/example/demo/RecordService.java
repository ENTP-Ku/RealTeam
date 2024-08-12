package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecordService {

    @Autowired
    private RecordRepository recordRepository;

    public void saveRecord(RecordDTO recordDTO, String username) {
        Record record = new Record(recordDTO.getTitle(), recordDTO.getContent(), username, new Date());
        recordRepository.save(record);
    }

    public List<RecordDTO> getAllRecords() {
        return recordRepository.findAll().stream()
                .map(record -> new RecordDTO(record.getId(), record.getTitle(), record.getUsername(), record.getDate(), record.getContent()))
                .collect(Collectors.toList());
    }

    public RecordDTO getRecordById(Long id) {
        Record record = recordRepository.findById(id).orElseThrow();
        return new RecordDTO(record.getId(), record.getTitle(), record.getUsername(), record.getDate(), record.getContent());
    }

    public String deleteRecord(Long id, String username) {
        Record record = recordRepository.findById(id).orElseThrow();
        if (record.getUsername().equals(username)) {
            recordRepository.delete(record);
            return "deleteSuccess";
        } else {
            return "삭제 권한이 없습니다.";
        }
    }
}
