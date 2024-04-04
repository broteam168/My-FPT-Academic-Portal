package broteam.myfap.backend.Repository.Time;

import broteam.myfap.backend.Models.Time.GroupSlot;
import broteam.myfap.backend.Models.Unit.School;
import broteam.myfap.backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupSlotRepository extends JpaRepository<GroupSlot, Integer> {
    @Query("select s from GroupSlot s where s.Name = :name")
    Optional<GroupSlot> findByName(@Param("name") String name);

}