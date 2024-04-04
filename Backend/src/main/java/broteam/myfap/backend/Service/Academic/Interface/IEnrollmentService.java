package broteam.myfap.backend.Service.Academic.Interface;

import broteam.myfap.backend.Dto.Academic.EnrollmentDto;
import broteam.myfap.backend.Models.Academic.Enrollment;
import jakarta.transaction.Transactional;

import java.util.List;

public interface IEnrollmentService {
    List<EnrollmentDto> findAllBase();

    EnrollmentDto findEnrollmentById(int id);

    @Transactional
    List<EnrollmentDto> findEnrollmentByStudentId(int studentId);

    @Transactional
    EnrollmentDto createEnrollment(EnrollmentDto newEnrollment);
}
