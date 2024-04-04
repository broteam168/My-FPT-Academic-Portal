package broteam.myfap.backend.Repository.Academic;

import broteam.myfap.backend.Models.Academic.Semester;
import broteam.myfap.backend.Models.Major.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SemesterRepository extends JpaRepository<Semester, Integer> {

}
