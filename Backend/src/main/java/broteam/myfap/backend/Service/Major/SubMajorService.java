package broteam.myfap.backend.Service.Major;

import broteam.myfap.backend.Converter.Major.MajorConverter;
import broteam.myfap.backend.Dto.Major.SubMajorDto;
import broteam.myfap.backend.Dto.Major.SubMajorRequestDto;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Models.Major.SubMajor;
import broteam.myfap.backend.Repository.Major.SubMajorRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubMajorService implements  ISubMajorService{
    private final SubMajorRepository subMajorRepository;
    private final MajorConverter majorConverter;
    private final ModelMapper modelMapper = new ModelMapper();


    @Override
    public List<SubMajorDto> findAllBase() {
        List<SubMajorDto> results = new ArrayList<>();
        for(SubMajor subMajorDto :  subMajorRepository.findAll())
        {
            results.add(majorConverter.toDto(subMajorDto));
        }
        return  results;
    }
    @Override
    public List<SubMajorDto> FindByMajorId(int id) {
        List<SubMajorDto> results = new ArrayList<>();

        List<SubMajor> enitities = subMajorRepository.findByMajorId(id);
        for(SubMajor enitity : enitities)
        {
            results.add(majorConverter.toDto(enitity));
        }
        return results;
    }
    @Transactional
    @Override
    public SubMajorDto createNewSubMajor(SubMajorRequestDto newSubMajor) {

        SubMajor base = majorConverter.toEnity(newSubMajor);

        Optional<SubMajor> duplicate = subMajorRepository.findByName(base.getName());
        if (duplicate.stream().count() > 0) {
            throw new SchoolException("SubMajor name is already used");
        }
        SubMajor createdSubMajor = subMajorRepository.save(base);
        return majorConverter.toDto(createdSubMajor);
    } @Transactional
    @Override
    public SubMajorDto updateSubMajor(int id, SubMajorRequestDto newSubMajor) {
        SubMajor baseSubMajor = modelMapper.map(newSubMajor, SubMajor.class);

        Optional<SubMajor> duplicate2 = subMajorRepository.findById(id);
       Optional<SubMajor> duplicate = subMajorRepository.findByName(baseSubMajor.getName());
        if (!newSubMajor.getName().equals(duplicate2.get().getName()) && duplicate.stream().count() > 0) {
           throw new SchoolException("Sub-major name is already used");}
        if (duplicate2.stream().count() > 0) {
            baseSubMajor.setId(id);
            SubMajor updatedSubmajor = subMajorRepository.save(baseSubMajor);
            return majorConverter.toDto(updatedSubmajor);
        }
        return majorConverter.toDto(baseSubMajor);
    }
    @Override
    public SubMajorDto findById(int id) {
        Optional<SubMajor> ggotSubMajor = subMajorRepository.findById(id);
        if (ggotSubMajor.isEmpty()) throw new NotFoundException("Cannot find submajor");
        return majorConverter.toDto(ggotSubMajor.get());
    }
    @Transactional
    @Override
    public SubMajorDto deleteById(int id) {

        Optional<SubMajor> foundClass = subMajorRepository.findById(id);
        if (foundClass.isEmpty()) throw new NotFoundException("Cannot find submajor");
//        List<Class> foundClass= duplicate2.getClasses();
//        if(foundClass.isEmpty())
//            schoolRepository.deleteById(id);
//        else  throw new SchoolException("School have classes! Cannot remove!");
        subMajorRepository.deleteById(id);
        return majorConverter.toDto(foundClass.get());
    }
}
