package broteam.myfap.backend.Service.Academic.Implementation;

import broteam.myfap.backend.Converter.Academic.EnrollmentConverter;
import broteam.myfap.backend.Dto.Academic.CourseDto;
import broteam.myfap.backend.Dto.Academic.EnrollmentDto;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Models.Academic.Enrollment;
import broteam.myfap.backend.Repository.Academic.EnrollmentRespository;
import broteam.myfap.backend.Service.Academic.Interface.IEnrollmentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EnrollmentService implements IEnrollmentService {
    private final EnrollmentRespository enrollmentRespository;
    private final EnrollmentConverter enrollmentConverter;
    private final CourseService courseService;
    private final SemesterService semesterService;
    @Override
    public List<EnrollmentDto> findAllBase() {
        List<EnrollmentDto> results = new ArrayList<>();
        for (Enrollment item : enrollmentRespository.findAll()) {
            results.add(enrollmentConverter.toDto(item));
        }
        return results;
    }

    @Override
    public EnrollmentDto findEnrollmentById(int id) {
        Enrollment gotEnrollment = enrollmentRespository.findById(id);
        if (gotEnrollment == null) {
            throw new NotFoundException("Cannot find enrollment");
        }
        return enrollmentConverter.toDto(gotEnrollment);
    }

    @Override
    public List<EnrollmentDto> findEnrollmentByStudentId(int studentId) {
        List<EnrollmentDto> results = new ArrayList<>();
        List<Enrollment> entities = enrollmentRespository.findEnrollmentByStudentId(studentId);
        for (Enrollment entity : entities) {
            results.add(enrollmentConverter.toDto(entity));
        }
        return results;
    }

    @Override
    @Transactional
    public EnrollmentDto createEnrollment(EnrollmentDto newEnrollment) {
        Enrollment baseEnrollment = enrollmentConverter.toEntity(newEnrollment);

        LocalDate now = LocalDate.now();
        newEnrollment.setCreateAt(Date.from(now.atStartOfDay(ZoneId.systemDefault()).toInstant()));

        CourseDto courseTest = courseService.findById(newEnrollment.getCourseId());


        if (newEnrollment.getCreateAt().after(courseTest.getSemester().getStartDate())) {
            throw new RuntimeException("Semester is started");
        }

        Optional<Enrollment> duplicate = enrollmentRespository.findEnrollmentByStudentIdAndCourseId(baseEnrollment.getStudentId(), baseEnrollment.getCourseId());
        if (duplicate.stream().count() > 0) {
            throw new RuntimeException("Enrollment is exist");
        }

        List<EnrollmentDto> listEnrollmentOfStudent = findEnrollmentByStudentId(newEnrollment.getStudentId());
        for (EnrollmentDto item : listEnrollmentOfStudent) {
            if (courseService.findById(item.getCourseId()).getSubject().getId() ==
                    courseService.findById(newEnrollment.getCourseId()).getSubject().getId()) {
                throw new RuntimeException("Student had already register subject");
            }

            if (courseService.findById(item.getCourseId()).getSlots().equals(courseService.findById(newEnrollment.getCourseId()).getSlots())) {
                throw new RuntimeException("The schedule for this course has clashed");
            }
        }

        Enrollment createEnrollment = enrollmentRespository.save(baseEnrollment);
        return enrollmentConverter.toDto(createEnrollment);
    }
}
