package broteam.myfap.backend.Repository.Major;

import broteam.myfap.backend.Models.Major.Major;
import broteam.myfap.backend.Models.Major.SubMajor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubMajorRepository extends JpaRepository<SubMajor, Integer> {
    @Query("select c from SubMajor c where c.Name = :name")
    Optional<SubMajor> findByName(@Param("name") String name);

    @Query("select c from SubMajor c where c.MajorId = :id")
    List<SubMajor> findByMajorId(@Param("id")int id);

    @Query("select c from SubMajor c where c.MajorId = :MajorId and c.IsCommon = :isIsCommon")
    List<SubMajor> findSubMajorByMajorIdAndCommon(int MajorId,boolean isIsCommon);
}
