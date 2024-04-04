package broteam.myfap.backend.Repository.Academic;

import broteam.myfap.backend.Models.Academic.Course;
import broteam.myfap.backend.Models.Academic.Curiculum;
import broteam.myfap.backend.Models.Academic.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseRespository extends JpaRepository<Course, Integer> {
    @Query("select s from Course s where s.classs.id = :id")
    List<Course> findByClassId(@Param("id") Integer id);



}
