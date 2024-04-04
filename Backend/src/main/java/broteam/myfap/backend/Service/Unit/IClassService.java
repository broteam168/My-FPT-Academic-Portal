package broteam.myfap.backend.Service.Unit;

import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Dto.Unit.ClassRequest;
import broteam.myfap.backend.Dto.Unit.SchoolDto;
import broteam.myfap.backend.Models.Unit.School;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IClassService {
    List<ClassDto> findAllBase();


    ClassDto findClassById(int id);

    List<ClassDto> FindBySchoolId(int id);

    @Transactional
    ClassDto createNewCLass(ClassRequest newCLass);

    @Transactional
    ClassDto updateClass(int id, ClassRequest newCLass);

    @Transactional
    ClassDto deleteById(int id);
}
