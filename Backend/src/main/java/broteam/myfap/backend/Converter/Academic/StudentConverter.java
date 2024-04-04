package broteam.myfap.backend.Converter.Academic;

import broteam.myfap.backend.Dto.Academic.StudentDto;
import broteam.myfap.backend.Dto.Academic.StudentRequest;
import broteam.myfap.backend.Models.Academic.Student;
import org.springframework.stereotype.Component;

@Component
public class StudentConverter {
    public StudentDto toDto(Student entity) {
        StudentDto dto = new StudentDto();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUserId());
        dto.setSubMajorId(entity.getSubMajorId());
        dto.setSemester(entity.getSemester());
        dto.setSchoolId(entity.getSchoolId());
        dto.setClassId(entity.getClassId());
        dto.setStudentCode(entity.getStudentCode());
        dto.setDob(entity.getDob());
        return dto;
    }

    public Student toEntity(StudentDto dto) {
        Student entity = new Student();
        entity.setId(dto.getId());
        entity.setUserId(dto.getUserId());
        entity.setSubMajorId(dto.getSubMajorId());
        entity.setSemester(dto.getSemester());
        entity.setSchoolId(dto.getSchoolId());
        entity.setClassId(dto.getClassId());
        entity.setStudentCode(dto.getStudentCode());
        entity.setDob(dto.getDob());
        return entity;
    }

    public StudentRequest toRequestDto(Student entity) {
        StudentRequest dto = new StudentRequest();
        dto.setId(entity.getId());
        dto.setUser(entity.getUser());
        dto.setSubMajorId(entity.getSubMajorId());
        dto.setSemester(entity.getSemester());
        dto.setSchoolId(entity.getSchoolId());
        dto.setClassId(entity.getClassId());
        dto.setStudentCode(entity.getStudentCode());
        dto.setDob(entity.getDob());
        return dto;
    }
}
