package broteam.myfap.backend.Service.Academic.Interface;

import broteam.myfap.backend.Dto.Academic.SyllabusDto;
import jakarta.transaction.Transactional;

import java.util.List;

public interface ISyllabusService {
    List<SyllabusDto> findAllBase();

    SyllabusDto findSyllabusById(int id);

    List<SyllabusDto> findBySubjectId(int id);

    @Transactional
    SyllabusDto createNewSyllabus(SyllabusDto newSyllabus);

    @Transactional
    SyllabusDto updateSyllabusById(int id, SyllabusDto newSyllabus);

    @Transactional
    SyllabusDto deleteSyllabusById(int id);

    SyllabusDto findCurrentSyllabus(int subjectId);
}
