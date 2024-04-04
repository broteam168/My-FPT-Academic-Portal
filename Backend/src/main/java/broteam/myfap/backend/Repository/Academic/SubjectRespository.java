package broteam.myfap.backend.Repository.Academic;

import broteam.myfap.backend.Dto.Academic.SubjectDto;
import broteam.myfap.backend.Models.Academic.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SubjectRespository extends JpaRepository<Subject, Integer> {
    @Query("select s from Subject s where s.name = :name")
    Optional<Subject> findByName(@Param("name") String name);
    Subject save(SubjectDto baseSubjectDto);
    Subject findById(int id);

    @Query("select s from Subject s where s.subjectCode = :subjectCode")
    Optional<Subject> findBySubjectCode(@Param("subjectCode") String subjectCode);
}
