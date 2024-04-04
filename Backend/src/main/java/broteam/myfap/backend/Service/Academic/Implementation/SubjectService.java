package broteam.myfap.backend.Service.Academic.Implementation;

import broteam.myfap.backend.Converter.Academic.AcademicConverter;
import broteam.myfap.backend.Dto.Academic.SubjectDto;
import broteam.myfap.backend.Exception.Academic.SubjectException;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Models.Academic.Subject;
import broteam.myfap.backend.Repository.Academic.SubjectRespository;
import broteam.myfap.backend.Service.Academic.Interface.ISubjectService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectService implements ISubjectService {

    private final SubjectRespository subjectRespository;
    private final AcademicConverter academicConverter;


    @Override
    public List<SubjectDto> findAllBase() {
        List<SubjectDto> results = new ArrayList<>();
        for (Subject subject : subjectRespository.findAll()) {
            results.add(academicConverter.toDto(subject));
        }
        return results;
    }

    @Override
    public Subject findSubjectById(int id) {
        Subject gotSubject = subjectRespository.findById(id);
        if (gotSubject == null)
            throw new NotFoundException("Cannot find Subject");
        return gotSubject;
    }

    @Transactional
    @Override
    public SubjectDto createNewSubject(SubjectDto newSubject) {
        Subject baseSubject = academicConverter.toEntity(newSubject);
        Optional<Subject> duplicate = subjectRespository.findBySubjectCode(baseSubject.getSubjectCode());
        if (duplicate.stream().count() > 0)
            throw new SubjectException("Subject code is already used");
        Subject createdSubject = subjectRespository.save(baseSubject);
        return academicConverter.toDto(createdSubject);
    }



    @Override
    public SubjectDto updateSubject(int id, SubjectDto newSubject) {
        Subject baseSubject = academicConverter.toEntity(newSubject);
        Subject duplicate = subjectRespository.findById(id);
        Optional<Subject> duplicate2 = subjectRespository.findBySubjectCode(newSubject.getSubjectCode());
        if (!duplicate.getName().equals(newSubject.getName()) && duplicate2.stream().count() > 0) {
            throw new SchoolException("School name is already used");
        }

        if (duplicate != null) {
            baseSubject.setId(duplicate.getId());
            subjectRespository.save(baseSubject);
        }

        return academicConverter.toDto(baseSubject);
    }


    @Override
    public Subject deleteSubject(int id) {
        Subject duplicate2 = subjectRespository.findById(id);
        if(duplicate2 == null)
            throw new NotFoundException("Cannot find school");

        subjectRespository.deleteById(id);

        return duplicate2;
    }
}
