package broteam.myfap.backend.Service.Academic.Interface;

import broteam.myfap.backend.Dto.Academic.SubjectDto;
import broteam.myfap.backend.Models.Academic.Subject;
import jakarta.transaction.Transactional;

import java.util.List;

public interface ISubjectService {

    List<SubjectDto> findAllBase();
    SubjectDto createNewSubject(SubjectDto newSubject);

    @Transactional
    Subject findSubjectById(int id);

    @Transactional
    public SubjectDto updateSubject(int id, SubjectDto newSubject);

    @Transactional
    Subject deleteSubject(int id);
}
