package broteam.myfap.backend.Repository.Academic;

import broteam.myfap.backend.Dto.Academic.SyllabusDto;
import broteam.myfap.backend.Models.Academic.Subject;
import broteam.myfap.backend.Models.Academic.Syllabus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SyllabusRespository extends JpaRepository<Syllabus, Integer> {
    @Query("select s from Syllabus s where s.subjectId = :subjectId")
    Optional<Syllabus> findBySubjectId(@Param("subjectId") int subjectId);

    Syllabus save(SyllabusDto syllabusDto);

    Syllabus findById(int id);

    @Query("select s from Syllabus s where s.studentTasks = :studentTasks")
    Optional<Syllabus> findSyllabusByStudentTasks(@Param("studentTasks") String studentTasks);
}
