package broteam.myfap.backend.Converter.Academic;

import broteam.myfap.backend.Dto.Academic.EnrollmentDto;
import broteam.myfap.backend.Models.Academic.Enrollment;
import org.springframework.stereotype.Component;

@Component
public class EnrollmentConverter {
    public EnrollmentDto toDto(Enrollment entity) {
        EnrollmentDto dto = new EnrollmentDto();
        dto.setId(entity.getId());
        dto.setNote(entity.getNote());
        dto.setStatus(entity.isStatus());
        dto.setQuality(entity.getQuality());
        dto.setType(entity.getType());
        dto.setCourseId(entity.getCourseId());
        dto.setStudentId(entity.getStudentId());
        dto.setCreateAt(entity.getCreateAt());
        return dto;
    }

    public Enrollment toEntity(EnrollmentDto dto) {
        Enrollment entity = new Enrollment();
        entity.setId(dto.getId());
        entity.setNote(dto.getNote());
        entity.setStatus(dto.isStatus());
        entity.setQuality(dto.getQuality());
        entity.setType(dto.getType());
        entity.setCourseId(dto.getCourseId());
        entity.setStudentId(dto.getStudentId());
        entity.setCreateAt(dto.getCreateAt());
        return entity;
    }
}
