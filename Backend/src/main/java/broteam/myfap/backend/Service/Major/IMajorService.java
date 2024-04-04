package broteam.myfap.backend.Service.Major;

import broteam.myfap.backend.Dto.Major.MajorDto;
import broteam.myfap.backend.Dto.Major.MajorRequestDto;
import broteam.myfap.backend.Dto.Unit.SchoolDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IMajorService {
    List<MajorDto> findAllBase();



    MajorDto findMajorById(int id);

    @Transactional
    MajorDto createNewMajor(MajorRequestDto newCLass);

    @Transactional
    MajorDto updateMajor(int id, MajorRequestDto updatedMajor);

    @Transactional
    MajorDto deleteMajor(int id);
}
