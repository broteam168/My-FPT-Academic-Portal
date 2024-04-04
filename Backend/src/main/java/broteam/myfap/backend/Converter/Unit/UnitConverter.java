package broteam.myfap.backend.Converter.Unit;

import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Dto.Unit.RoomDto;
import broteam.myfap.backend.Dto.Unit.SchoolDto;
import broteam.myfap.backend.Dto.Unit.SchoolFullDto;
import broteam.myfap.backend.Models.Unit.Class;
import broteam.myfap.backend.Models.Unit.Room;
import org.springframework.stereotype.Component;
import broteam.myfap.backend.Models.Unit.School;

@Component
public class UnitConverter {
    public SchoolDto toDto(School entity){
        SchoolDto dto = new SchoolDto();
        if(entity.getId() > 0 ){
            dto.setId(entity.getId());
        }
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setLocation(entity.getLocation());
        dto.setPhone(entity.getPhone());
        dto.setIsActive(entity.isIsActive());

        return dto;
    }
    public SchoolFullDto toDto2(School entity){
        SchoolFullDto dto = new SchoolFullDto();
        if(entity.getId() > 0 ){
            dto.setId(entity.getId());
        }
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setLocation(entity.getLocation());
        dto.setPhone(entity.getPhone());
        dto.setIsActive(entity.isIsActive());
        dto.setClasses(entity.getClasses());
        return dto;
    }
    public RoomDto toDto(Room entity){
        RoomDto dto = new RoomDto();
        if(entity.getId() > 0 ){
            dto.setId(entity.getId());
        }
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setBuilding(entity.getBuilding());
        dto.setType(entity.getType());
        dto.setIsActive(entity.isIsActive());
        return dto;
    }
    public ClassDto toDto(Class entity){
        ClassDto dto = new ClassDto();
        if(entity.getId() > 0 ){
            dto.setId(entity.getId());
        }
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setMajor(entity.getMajor());
        dto.setSchool(entity.getSchool());
        dto.setIsActive(entity.isIsActive());

        return dto;
    }
}
