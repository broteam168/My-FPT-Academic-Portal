package broteam.myfap.backend.Service.Academic.Implementation;

import broteam.myfap.backend.Converter.Academic.AcademicConverter;
import broteam.myfap.backend.Dto.Academic.CuriculumDto;
import broteam.myfap.backend.Dto.Academic.CuriculumRequest;
import broteam.myfap.backend.Dto.Academic.SubjectDto;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Models.Academic.Curiculum;
import broteam.myfap.backend.Models.Academic.Subject;
import broteam.myfap.backend.Repository.Academic.CuriculumRespository;
import broteam.myfap.backend.Repository.Academic.SubjectRespository;
import broteam.myfap.backend.Service.Academic.Interface.ICuriculumService;
import broteam.myfap.backend.Service.Major.SubMajorService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CuriculumService implements ICuriculumService {
    private final CuriculumRespository curiculumRespository;
    private final AcademicConverter academicConverter;
    private final SubjectService subjectService;
    private final SubMajorService subMajorService;
    private final SubjectRespository subjectRespository;
    private final ModelMapper modelMapper = new ModelMapper();
    @Override
    public List<CuriculumDto> findAllBase() {
        List<CuriculumDto> results = new ArrayList<>();
        for (Curiculum curiculum : curiculumRespository.findAll()) {
            results.add(academicConverter.toDto(curiculum));
        }
        return results;
    }

    @Override
    public CuriculumDto findCuriculumById(int id) {
        Curiculum gotCuriculum = curiculumRespository.findById(id);
        if (gotCuriculum == null) {
            throw new NotFoundException("Cannot find curriculum");
        }
        return academicConverter.toDto(gotCuriculum);
    }

    @Override
    public List<CuriculumDto> findCuriBySubMajorId(int subMajorId) {
        List<CuriculumDto> results = new ArrayList<>();
        List<Curiculum> entities = curiculumRespository.findCuriculumBySubMajorId(subMajorId);
        for (Curiculum entity : entities) {
            results.add(academicConverter.toDto(entity));
        }
        return results;
    }

    public List<CuriculumDto> findCuriBySubMajorIdAndSememster(int subMajorId,int semester) {
        List<CuriculumDto> results = new ArrayList<>();
        List<Curiculum> entities = curiculumRespository.findCuriculumBySubMajorId(subMajorId);
        for (Curiculum entity : entities) {
            if(entity.getSemester() == semester)results.add(academicConverter.toDto(entity));
        }
        return results;
    }
    @Transactional
    @Override
    public CuriculumDto deleteCuriculum(int id) {
        Curiculum foundCuriculum = curiculumRespository.findById(id);
        if (foundCuriculum == null) {
            throw new NotFoundException("Cannot find Curiculum");
        }
        curiculumRespository.deleteById(id);
        return academicConverter.toDto(foundCuriculum);
    }

    @Transactional
    @Override
    public CuriculumDto createNewCuriculum(CuriculumRequest newCuriculum) {
        Curiculum baseCuriculum = modelMapper.map(newCuriculum, Curiculum.class);

        Optional<Curiculum> duplicate = curiculumRespository.findCuriculumByAll(baseCuriculum.getSubjectId(), baseCuriculum.getSubMajorId(), baseCuriculum.getSemester());
        if (duplicate.stream().count() > 0) {
            throw new RuntimeException("Curiculum is exist");
        }
        Curiculum createdCuriculum = curiculumRespository.save(baseCuriculum);
        return academicConverter.toDto(createdCuriculum);
    }

    @Transactional
    @Override
    public CuriculumDto updateCuriculum(int id, CuriculumRequest newCuriculum) {
        Curiculum baseCuriculum = modelMapper.map(newCuriculum, Curiculum.class);

        Optional<Curiculum> duplicate2 = curiculumRespository.findCuriculumBySubjectIdAndSemester(baseCuriculum.getSubjectId(), baseCuriculum.getSemester());
        if (duplicate2.stream().count() > 0) {
            throw new RuntimeException("Subject is exist in semester");
        }

        Curiculum duplicate = curiculumRespository.findById(id);
        if (duplicate != null) {
            baseCuriculum.setId(id);
            baseCuriculum.setCreatedAt(duplicate.getCreatedAt());
            Curiculum createCuriculum = curiculumRespository.save(baseCuriculum);
            return academicConverter.toDto(createCuriculum);
        }


        return academicConverter.toDto(baseCuriculum);
    }

    @Override
    public SubjectDto getSubjectByCuriculum(int id) {
        Subject gotSubject = subjectRespository.findById(id);
        if (gotSubject == null) {
            throw new NotFoundException("Cannot find subject");
        }
        return academicConverter.toDto(gotSubject);
    }
}
