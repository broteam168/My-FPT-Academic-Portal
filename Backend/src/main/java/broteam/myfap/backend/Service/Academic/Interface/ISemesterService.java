package broteam.myfap.backend.Service.Academic.Interface;

import broteam.myfap.backend.Dto.Academic.SemesterDto;
import broteam.myfap.backend.Dto.Academic.SemesterRequestDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ISemesterService {

    List<SemesterDto> findAllBase();

    @Transactional
    SemesterDto createNewSemester(SemesterRequestDto newMajor);

    SemesterRequestDto findById(int id);

    @Transactional
    SemesterDto updateSemester(int id, SemesterRequestDto updatedSemester);

    @Transactional
    SemesterDto deleteMajor(int id);
}
