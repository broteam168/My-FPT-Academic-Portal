package broteam.myfap.backend.Repository.Academic;

import broteam.myfap.backend.Models.Academic.Curiculum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CuriculumRespository extends JpaRepository<Curiculum, Integer> {

    @Query("select c from Curiculum c where c.subMajorId = :subMajorId")
    List<Curiculum> findCuriculumBySubMajorId(@Param("subMajorId") int subMajorId);

    Curiculum findById(int id);

    @Query("select c from Curiculum c where c.subjectId = :subjectId and c.subMajorId = :subMajorId and c.semester = :semester")
    Optional<Curiculum> findCuriculumByAll(@Param("subjectId") int subjectId, @Param("subMajorId") int subMajorId, @Param("semester") int semester);

    @Query("select c from Curiculum c where c.subjectId = :subjectId and c.semester = :semester")
    Optional<Curiculum> findCuriculumBySubjectIdAndSemester(@Param("subjectId") int subjectId, @Param("semester") int semester);
}
