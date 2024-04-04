package broteam.myfap.backend.Converter.Major;

import broteam.myfap.backend.Dto.Major.MajorDto;
import broteam.myfap.backend.Dto.Major.SubMajorDto;
import broteam.myfap.backend.Dto.Major.SubMajorRequestDto;
import broteam.myfap.backend.Models.Major.Major;
import broteam.myfap.backend.Models.Major.SubMajor;
import org.springframework.stereotype.Component;

@Component
public class MajorConverter {
    public MajorDto toDto(Major entity){
        MajorDto dto = new MajorDto();
        if(entity.getId() > 0 ){
            dto.setId(entity.getId());
        }
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setFullName(entity.getFullName());
        dto.setDescription(entity.getDescription());
        dto.setDegreeLevel(entity.getDegreeLevel());
        dto.setCategory(entity.getCategory());
        dto.setIsActive(entity.isIsActive());
        return dto;
    }
    public SubMajorDto toDto(SubMajor entity){
        SubMajorDto dto = new SubMajorDto();
        if(entity.getId() > 0 ){
            dto.setId(entity.getId());
        }
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setFullName(entity.getFullName());
        dto.setDescription(entity.getDescription());
        dto.setType(entity.getType());
        dto.setIsCommon(entity.isIsCommon());
        dto.setIsActive(entity.isIsActive());
        dto.setMajorId(entity.getMajorId());
        return dto;
    }
    public SubMajor toEnity(SubMajorRequestDto entity){
        SubMajor dto = new SubMajor();

        dto.setName(entity.getName());
        dto.setFullName(entity.getFullName());
        dto.setDescription(entity.getDescription());
        dto.setType(entity.getType());
        dto.setIsCommon(entity.isIsCommon());
        dto.setIsActive(entity.isIsActive());
        dto.setMajorId(entity.getMajorId());
        return dto;
    }
}
