package broteam.myfap.backend.Service.Academic.Implementation;

import broteam.myfap.backend.Converter.Academic.AcademicConverter;
import broteam.myfap.backend.Dto.Academic.SyllabusDto;
import broteam.myfap.backend.Exception.Academic.SyllabusException;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Models.Academic.Subject;
import broteam.myfap.backend.Models.Academic.Syllabus;
import broteam.myfap.backend.Repository.Academic.SyllabusRespository;
import broteam.myfap.backend.Service.Academic.Interface.ISyllabusService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class SyllabusService implements ISyllabusService {
    private final SyllabusRespository syllabusRespository;
    private final AcademicConverter academicConverter;
    private final SubjectService subjectService;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<SyllabusDto> findAllBase() {
        List<SyllabusDto> results = new ArrayList<>();
        for (Syllabus syllabus : syllabusRespository.findAll()) {
            results.add(academicConverter.toDto(syllabus));
        }
        return results;
    }

    @Override
    public SyllabusDto findSyllabusById(int id) {
        Syllabus gotSyllabus = syllabusRespository.findById(id);
        if (gotSyllabus == null)
            throw new NotFoundException("Cannot find syllabus");
        return academicConverter.toDto(gotSyllabus);

    }

    @Override
    public List<SyllabusDto> findBySubjectId(int id) {
        List<SyllabusDto> results = new ArrayList<>();

        Subject curruntSubject = new Subject();
        try {
            curruntSubject = subjectService.findSubjectById(id);
        } catch (Exception e) {
            return results;
        }

        List<Syllabus> syllabuses = curruntSubject.getSyllabuses();
        for (Syllabus item : syllabuses) {
            results.add(academicConverter.toDto(item));
        }

        return results;
    }

    @Transactional
    @Override
    public SyllabusDto createNewSyllabus(SyllabusDto newSyllabus) {
        Syllabus baseSyllabus = academicConverter.toEntity(newSyllabus);
        Optional<Syllabus> duplicate = syllabusRespository.findSyllabusByStudentTasks(baseSyllabus.getStudentTasks());
        if (duplicate.stream().count() > 0) {
            throw new SyllabusException("Student task is already used");
        }

        Syllabus createdSyllabus = syllabusRespository.save(baseSyllabus);
        return academicConverter.toDto(createdSyllabus);

    }

    @Override
    public SyllabusDto updateSyllabusById(int id, SyllabusDto newSyllabus) {
        Syllabus baseSyllabus = academicConverter.toEntity(newSyllabus);
        Syllabus duplicate = syllabusRespository.findById(id);
        if (duplicate != null) {
            baseSyllabus.setId(id);
            Syllabus createdSyllabus = syllabusRespository.save(baseSyllabus);
            return academicConverter.toDto(createdSyllabus);
        }
        return academicConverter.toDto(baseSyllabus);
    }

    @Override
    public SyllabusDto deleteSyllabusById(int id) {
        Syllabus foundSyllabus = syllabusRespository.findById(id);
        if (foundSyllabus == null) {
            throw new NotFoundException("Cannot find Syllabus");
        }
        syllabusRespository.deleteById(id);
        return academicConverter.toDto(foundSyllabus);
    }
    @Override
    public SyllabusDto findCurrentSyllabus(int subjectId)
    {
        List<SyllabusDto> raws = findBySubjectId(subjectId);
        for (SyllabusDto dto : raws)
        {
            if(dto.isActive()) return dto;
        }
        return null;
    }

}
