package broteam.myfap.backend.Repository.Time;

import broteam.myfap.backend.Models.Time.GroupSlot;
import broteam.myfap.backend.Models.Time.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Integer> {
    @Query("select s from Slot s where s.GroupId = :id")
    List<Slot> findByGroup(@Param("id") int id);


    @Query("select s from Slot s where s.GroupId = :id and s.Name = :name")
    List<Slot> findByGroupAndName(@Param("id") int id,@Param("name") String name);
}