package broteam.myfap.backend.Service.Unit;

import broteam.myfap.backend.Converter.Unit.UnitConverter;
import broteam.myfap.backend.Dto.Unit.SchoolDto;
import broteam.myfap.backend.Dto.Unit.SchoolFullDto;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Models.Unit.Class;
import broteam.myfap.backend.Models.Unit.School;
import broteam.myfap.backend.Repository.Unit.SchoolRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SchoolService implements ISchoolService{
    private final SchoolRepository schoolRepository;
    private final UnitConverter unitConverter;
    private final ModelMapper modelMapper = new ModelMapper();


    public SchoolService(SchoolRepository schoolRepository, UnitConverter unitConverter) {
        this.schoolRepository = schoolRepository;
        this.unitConverter = unitConverter;

    }

    @Override
    public List<SchoolDto> findAllBase() {
        List<SchoolDto> results = new ArrayList<>();
        for(School school :  schoolRepository.findAll())
        {
            results.add(unitConverter.toDto(school));
        }
        return  results;
    }
    @Override
    public List<SchoolFullDto> findAllBaseFull() {
        List<SchoolFullDto> results = new ArrayList<>();
        for(School school :  schoolRepository.findAll())
        {
            results.add(unitConverter.toDto2(school));
        }
        return  results;
    }
    @Override
    public School findSchoolById(int id) {
        School gotSchool = schoolRepository.findById(id);
        if(gotSchool == null ) throw new NotFoundException("Cannot find school");
        return gotSchool;
    }

    @Transactional
    @Override
   public SchoolDto createNewSchool(SchoolDto newSchool) {
        School baseSchool = modelMapper.map(newSchool, School.class);

        Optional<School> duplicate = schoolRepository.findByName(baseSchool.getName());
        if(duplicate.stream().count()>0)
        {
            throw new SchoolException("School name is already used");
        }
        School createdSchool = schoolRepository.save(baseSchool);
        return unitConverter.toDto(createdSchool);
    }
    @Transactional
    @Override
    public SchoolDto updateSchool(int id,SchoolDto newSchool) {
        School baseSchool = modelMapper.map(newSchool, School.class);

       School duplicate = schoolRepository.findById(id);
        Optional<School> duplicate2 = schoolRepository.findByName(newSchool.getName());
        if(!duplicate.getName().equals(newSchool.getName()) && duplicate2.stream().count()>0)
            throw new SchoolException("School name is already used");
        if(duplicate!=null) {

            baseSchool.setId(duplicate.getId());
            schoolRepository.save(baseSchool);
        }
        return unitConverter.toDto(baseSchool);
    }
    @Transactional
    @Override
    public School deleteSchool(int id) {

        School duplicate2 = schoolRepository.findById(id);
        if(duplicate2==null)
            throw new NotFoundException("Cannot find school");
        List<Class> foundClass= duplicate2.getClasses();
        if(foundClass.isEmpty())
            schoolRepository.deleteById(id);
        else  throw new SchoolException("School have classes! Cannot remove!");
        return duplicate2;
    }
}
