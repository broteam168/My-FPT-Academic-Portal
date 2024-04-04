package broteam.myfap.backend.Service.Academic.Interface;

import broteam.myfap.backend.Dto.Academic.CuriculumDto;
import broteam.myfap.backend.Dto.Academic.CuriculumRequest;
import broteam.myfap.backend.Dto.Academic.SubjectDto;
import jakarta.transaction.Transactional;

import java.util.List;

public interface ICuriculumService {
    List<CuriculumDto> findAllBase();

    CuriculumDto findCuriculumById(int id);

    List<CuriculumDto> findCuriBySubMajorId(int subMajorId);

    @Transactional
    CuriculumDto deleteCuriculum(int id);

    @Transactional
    CuriculumDto createNewCuriculum(CuriculumRequest newCuriculum);

    @Transactional
    CuriculumDto updateCuriculum(int id, CuriculumRequest newCuriculum);

    @Transactional
    SubjectDto getSubjectByCuriculum(int id);
}
