package broteam.myfap.backend.Repository.Unit;


import broteam.myfap.backend.Models.Unit.Class;
import broteam.myfap.backend.Models.Unit.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query("select c from Room c where c.SchoolId = :id")
    List<Room> findBySchoolId(int  id);

    @Query("select c from Room c where c.Name = :name")
    Optional<Room> findByName(@Param("name") String name);
}
