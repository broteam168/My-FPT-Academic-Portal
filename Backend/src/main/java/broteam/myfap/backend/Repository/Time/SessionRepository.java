package broteam.myfap.backend.Repository.Time;

import broteam.myfap.backend.Models.Academic.Course;
import broteam.myfap.backend.Models.Time.Session;
import broteam.myfap.backend.Models.Time.Slot;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Integer> {
    @Query("select s from Session s where s.course.classs.id = :id")
    List<Session> findByClassId(@Param("id") Integer id);

    @Query("select s from Session s where s.course.id = :id")
    List<Session> findByCourseId(@Param("id") Integer id);

}