package broteam.myfap.backend.Repository.Major;

import broteam.myfap.backend.Models.Major.Major;
import broteam.myfap.backend.Models.Unit.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MajorRepository extends JpaRepository<Major, Integer> {
    @Query("select c from Major c where c.Name = :name")
    Optional<Major> findByName(@Param("name") String name);

    Major findById(int id);
}
