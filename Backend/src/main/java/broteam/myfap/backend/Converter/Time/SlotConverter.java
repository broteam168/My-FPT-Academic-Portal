package broteam.myfap.backend.Converter.Time;

import broteam.myfap.backend.Dto.Time.GroupSlotDto;
import broteam.myfap.backend.Dto.Time.SlotDto;
import broteam.myfap.backend.Dto.Unit.SchoolDto;
import broteam.myfap.backend.Models.Time.GroupSlot;
import broteam.myfap.backend.Models.Time.Slot;
import broteam.myfap.backend.Models.Unit.School;
import org.springframework.stereotype.Component;

@Component
public class SlotConverter {
    public GroupSlotDto toDto(GroupSlot entity){
        GroupSlotDto dto = new GroupSlotDto();
        if(entity.getId() > 0 ){
            dto.setId(entity.getId());
        }
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setIsActive(entity.isIsActive());
        dto.setType(entity.getType());
        return dto;
    }
    public SlotDto toDto(Slot entity){
        SlotDto dto = new SlotDto();
        if(entity.getId() > 0 ){
            dto.setId(entity.getId());
        }
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setIsActive(entity.isIsActive());
        dto.setStartTime(entity.getStartTime());
        dto.setEndTime(entity.getEndTime());
        dto.setOrder(entity.getOrder());
        dto.setGroupId(entity.getGroupId());
        return dto;
    }
}
