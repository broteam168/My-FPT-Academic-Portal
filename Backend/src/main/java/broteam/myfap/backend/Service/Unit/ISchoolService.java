package broteam.myfap.backend.Service.Unit;

import broteam.myfap.backend.Dto.Unit.SchoolDto;
import broteam.myfap.backend.Dto.Unit.SchoolFullDto;
import broteam.myfap.backend.Models.Unit.School;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ISchoolService {
     List<SchoolDto> findAllBase();
     SchoolDto createNewSchool(SchoolDto newSchool);

    List<SchoolFullDto> findAllBaseFull();

    @Transactional
     School findSchoolById(int id);


     @Transactional
     public SchoolDto updateSchool(int id,SchoolDto newSchool) ;

     @Transactional
     School deleteSchool(int id);
}
