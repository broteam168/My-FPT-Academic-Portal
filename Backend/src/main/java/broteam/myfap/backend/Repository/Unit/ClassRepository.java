package broteam.myfap.backend.Repository.Unit;

import broteam.myfap.backend.Models.Unit.Class;
import broteam.myfap.backend.Models.Unit.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ClassRepository extends JpaRepository<Class, Integer> {
    @Query("select c from Class c where c.Name = :name")
    Optional<Class> findByName(@Param("name") String name);
}
