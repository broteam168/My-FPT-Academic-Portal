package broteam.myfap.backend.Service.Unit;

import broteam.myfap.backend.Converter.Unit.UnitConverter;
import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Dto.Unit.ClassRequest;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Models.Unit.Class;
import broteam.myfap.backend.Models.Unit.School;
import broteam.myfap.backend.Repository.Unit.ClassRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClassService implements IClassService {
    private final ClassRepository classRepository;
    private final UnitConverter unitConverter;

    private final SchoolService schoolService;
    private final ModelMapper modelMapper = new ModelMapper();

    public ClassService(ClassRepository classRepository, UnitConverter unitConverter, SchoolService schoolService) {
        this.classRepository = classRepository;
        this.unitConverter = unitConverter;
        this.schoolService = schoolService;
    }

    @Override
    public List<ClassDto> findAllBase() {

        List<ClassDto> results = new ArrayList<>();
        for (Class classItem : classRepository.findAll()) {
            results.add(unitConverter.toDto(classItem));
        }
        return results;
    }

    @Override
    public ClassDto findClassById(int id) {
        Optional<Class> gotClass = classRepository.findById(id);
        if (gotClass.isEmpty()) throw new NotFoundException("Cannot find class");
        return unitConverter.toDto(gotClass.get());
    }

    @Override
    public List<ClassDto> FindBySchoolId(int id) {
        List<ClassDto> results = new ArrayList<>();
        School currentSchool = new School();
        try {
            currentSchool = schoolService.findSchoolById(id);
        } catch (Exception ex) {
            return results;
        }
        List<Class> result = currentSchool.getClasses();
        for (Class item : result) {
            results.add(unitConverter.toDto(item));
        }

        return results;
    }

    @Transactional
    @Override
    public ClassDto createNewCLass(ClassRequest newCLass) {
        Class baseClass = modelMapper.map(newCLass, Class.class);

        Optional<Class> duplicate = classRepository.findByName(baseClass.getName());
        if (duplicate.stream().count() > 0) {
            throw new SchoolException("Class name is already used");
        }
        Class createdClass = classRepository.save(baseClass);
        return unitConverter.toDto(createdClass);
    }

    @Transactional
    @Override
    public ClassDto updateClass(int id, ClassRequest newCLass) {
        Class baseClass = modelMapper.map(newCLass, Class.class);

        Optional<Class> duplicate2 = classRepository.findById(id);
//        Optional<Class> duplicate = classRepository.findByName(baseClass.getName());
//        if (newCLass.getName().equals(duplicate2.get().getName()) && duplicate.stream().count() > 0) {
//            throw new SchoolException("Class name is already used");
//        }
        if (duplicate2.stream().count() > 0) {
            baseClass.setId(id);
            Class createdClass = classRepository.save(baseClass);
            return unitConverter.toDto(createdClass);
        }
        return unitConverter.toDto(baseClass);
    }

    @Transactional
    @Override
    public ClassDto deleteById(int id) {

        Optional<Class> foundClass = classRepository.findById(id);
        if (foundClass.isEmpty()) throw new NotFoundException("Cannot find Class");
//        List<Class> foundClass= duplicate2.getClasses();
//        if(foundClass.isEmpty())
//            schoolRepository.deleteById(id);
//        else  throw new SchoolException("School have classes! Cannot remove!");
        classRepository.deleteById(id);
        return unitConverter.toDto(foundClass.get());
    }
}
