package broteam.myfap.backend.Service.Major;

import broteam.myfap.backend.Dto.Major.MajorDto;
import broteam.myfap.backend.Dto.Major.MajorRequestDto;
import broteam.myfap.backend.Dto.Major.SubMajorDto;
import broteam.myfap.backend.Dto.Major.SubMajorRequestDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ISubMajorService {
    List<SubMajorDto> findAllBase();


    List<SubMajorDto> FindByMajorId(int id);

    @Transactional
    SubMajorDto createNewSubMajor(SubMajorRequestDto newSubMajor);

    @Transactional
    SubMajorDto updateSubMajor(int id, SubMajorRequestDto newSubMajor);

    SubMajorDto findById(int id);

    @Transactional
    SubMajorDto deleteById(int id);
}
