package broteam.myfap.backend.Service.Academic.Interface;

import broteam.myfap.backend.Dto.Academic.*;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

public interface ICourseService {

    List<CourseDto> findAllBase();

    CourseDto findById(int id);


    @Transactional
    ReturnCourseDto updateCourse(int id, RequestCourseDto updatedCourse, boolean active);

    List<ReturnCourseDto> addCoursesByClasses(CourseRequest1Dto newData);

    List<CourseDto> findBySchoolAndClass(Optional<Integer> schoolId, Optional<Integer> classid);

    @Transactional
    RequestCourseDto deleteById(int id);
}
