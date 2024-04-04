package broteam.myfap.backend.Repository.Academic;

import broteam.myfap.backend.Models.Academic.Course;
import broteam.myfap.backend.Models.Academic.RequestCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseRequestRespository extends JpaRepository<RequestCourse, Integer> {
    @Query("select s from RequestCourse s where s.RoomId = :id and  s.Status != 'FINISH'")
    List<RequestCourse> findByRoomId(@Param("id") Integer roomid);

}
