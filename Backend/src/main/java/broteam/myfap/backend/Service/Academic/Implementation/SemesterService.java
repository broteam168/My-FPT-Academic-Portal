package broteam.myfap.backend.Service.Academic.Implementation;

import broteam.myfap.backend.Converter.Academic.AcademicConverter;
import broteam.myfap.backend.Dto.Academic.SemesterDto;
import broteam.myfap.backend.Dto.Academic.SemesterRequestDto;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Models.Academic.Semester;
import broteam.myfap.backend.Repository.Academic.SemesterRepository;
import broteam.myfap.backend.Service.Academic.Interface.ISemesterService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SemesterService implements ISemesterService {
    private final SemesterRepository semesterRepository;

    private final AcademicConverter academicConverter;
    private final ModelMapper modelMapper = new ModelMapper();


    @Override
    public List<SemesterDto> findAllBase() {
        List<SemesterDto> results = new ArrayList<>();
        for(Semester semester :  semesterRepository.findAll())
        {

            results.add(academicConverter.toDto(semester));
        }
        return  results;
    }

    @Transactional
    @Override
    public SemesterDto createNewSemester(SemesterRequestDto newMajor) {

        Semester base = modelMapper.map(newMajor, Semester.class);

         Semester createdMajor = semesterRepository.save(base);

        return academicConverter.toDto(createdMajor);
    }
    @Override
    public SemesterRequestDto findById(int id) {
        Optional<Semester> gotSemester = semesterRepository.findById(id);
        if(gotSemester.isEmpty() ) throw new NotFoundException("Cannot find semester");
        return academicConverter.toDtoRequest(gotSemester.get());
    }
    @Transactional
    @Override
    public SemesterDto updateSemester(int id, SemesterRequestDto updatedSemester) {
        Semester baseSenester = modelMapper.map(updatedSemester, Semester.class);

        Optional<Semester> duplicate = semesterRepository.findById(id);

        if(duplicate.isPresent()) {
            if(updatedSemester.isIsActive())
            {
                for(Semester semester :  semesterRepository.findAll()) {
                    semester.setIsActive(false);
                    semesterRepository.save(semester);
                }
            }
            baseSenester.setId(duplicate.get().getId());
            semesterRepository.save(baseSenester);
        }
        return academicConverter.toDto(baseSenester);
    }
    @Transactional
    @Override
    public SemesterDto deleteMajor(int id) {

        Optional<Semester> duplicate2 = semesterRepository.findById(id);
        if(duplicate2.isEmpty())
            throw new NotFoundException("Cannot find semester");
        semesterRepository.deleteById(id);

        return academicConverter.toDto(duplicate2.get());
    }
    public SemesterDto getCurrentSemester()
    {
        List<SemesterDto> results = new ArrayList<>();
        for(Semester semester :  semesterRepository.findAll())
        {

            if(semester.isIsActive()) results.add(academicConverter.toDto(semester));
        }
        return results.get(0);
    }
}
