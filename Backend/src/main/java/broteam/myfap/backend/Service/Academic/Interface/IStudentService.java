package broteam.myfap.backend.Service.Academic.Interface;

import broteam.myfap.backend.Dto.Academic.CourseDto;
import broteam.myfap.backend.Dto.Academic.CourseDto2;
import broteam.myfap.backend.Dto.Academic.StudentDto;
import broteam.myfap.backend.Dto.Academic.StudentRequest;
import broteam.myfap.backend.Models.Academic.Subject;
import jakarta.transaction.Transactional;

import java.util.List;

public interface IStudentService {

    List<StudentDto> findAllBase();

    @Transactional
    StudentRequest findStudentById(int id);

    @Transactional
    StudentDto findStudentByUserId(int id);

    @Transactional
    List<CourseDto2> findCourseByStudentId(int id);
}
