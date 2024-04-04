package broteam.myfap.backend.Repository.Academic;

import broteam.myfap.backend.Models.Academic.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRespository extends JpaRepository<Enrollment, Integer> {
    @Query("select e from Enrollment e where e.studentId = :studentId")
    List<Enrollment> findEnrollmentByStudentId(@Param("studentId") int studentId);

    Enrollment findById(int id);

    @Query("select e from Enrollment e where e.studentId = :studentId and e.courseId = :courseId")
    Optional<Enrollment> findEnrollmentByStudentIdAndCourseId(@Param("studentId") int studentId, @Param("courseId") int courseId);
}
