package broteam.myfap.backend.Service.Major;

import broteam.myfap.backend.Converter.Major.MajorConverter;
import broteam.myfap.backend.Dto.Major.MajorDto;
import broteam.myfap.backend.Dto.Major.MajorRequestDto;
import broteam.myfap.backend.Dto.Major.SubMajorRequestDto;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Models.Major.Major;
import broteam.myfap.backend.Models.Major.SubMajor;
import broteam.myfap.backend.Repository.Major.MajorRepository;
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
public class MajorService implements IMajorService{
    private final MajorRepository majorRepository;
    private final SubMajorRepository subMajorRepository;

    private final MajorConverter majorConverter;
    private final ModelMapper modelMapper = new ModelMapper();

    private final SubMajorService subMajorService;
    @Override
    public List<MajorDto> findAllBase() {
        List<MajorDto> results = new ArrayList<>();
        for(Major school :  majorRepository.findAll())
        {
            results.add(majorConverter.toDto(school));
        }
        return  results;
    }

    @Override
    public MajorDto findMajorById(int id) {
        Major gotMajor = majorRepository.findById(id);
        if(gotMajor == null ) throw new NotFoundException("Cannot find major");
        return majorConverter.toDto(gotMajor);
    }
    @Transactional
    @Override
    public MajorDto createNewMajor(MajorRequestDto newMajor) {

        Major base = modelMapper.map(newMajor, Major.class);

        Optional<Major> duplicate = majorRepository.findByName(base.getName());
        if (duplicate.stream().count() > 0) {
            throw new SchoolException("Major name is already used");
        }
        SubMajorRequestDto commondto = new SubMajorRequestDto();
         Major createdMajor = majorRepository.save(base);
        commondto.setMajorId(createdMajor.getId());
        commondto.setName(createdMajor.getName());
        commondto.setFullName(createdMajor.getFullName());
        commondto.setDescription(createdMajor.getDescription());
        commondto.setType(null);
        commondto.setIsCommon(true);
        commondto.setIsActive(true);
        subMajorService.createNewSubMajor(commondto);
        return majorConverter.toDto(createdMajor);
    }
    @Transactional
    @Override
    public MajorDto updateMajor(int id, MajorRequestDto updatedMajor) {
        Major baseMajor = modelMapper.map(updatedMajor, Major.class);

        Major duplicate = majorRepository.findById(id);
        Optional<Major> duplicate2 = majorRepository.findByName(updatedMajor.getName());
        if(!duplicate.getName().equals(updatedMajor.getName()) && duplicate2.stream().count()>0)
            throw new SchoolException("Major name is already used");
        if(duplicate!=null) {

            baseMajor.setId(duplicate.getId());
            majorRepository.save(baseMajor);
        }
        return majorConverter.toDto(baseMajor);
    }
    @Transactional
    @Override
    public MajorDto deleteMajor(int id) {

        Major duplicate2 = majorRepository.findById(id);
        if(duplicate2==null)
            throw new NotFoundException("Cannot find major");

            majorRepository.deleteById(id);
            List<SubMajor> found = subMajorRepository.findSubMajorByMajorIdAndCommon(id,true);
            if(!found.isEmpty()) {
                subMajorRepository.deleteById(found.get(0).getId());

            }
        else  throw new SchoolException("Major have SubMajor! Cannot remove!");
        return majorConverter.toDto(duplicate2);
    }
}
