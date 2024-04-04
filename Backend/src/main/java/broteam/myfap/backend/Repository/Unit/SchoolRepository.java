package broteam.myfap.backend.Repository.Unit;

import broteam.myfap.backend.Dto.Unit.SchoolDto;
import broteam.myfap.backend.Models.Unit.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School, Integer> {

    @Query("select s from School s where s.Name = :name")
    Optional<School> findByName(@Param("name") String name);
    School save(SchoolDto baseProductDto);

    School findById(int id);

}
