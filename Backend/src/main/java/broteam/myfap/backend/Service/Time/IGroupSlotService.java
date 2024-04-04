package broteam.myfap.backend.Service.Time;

import broteam.myfap.backend.Dto.Major.MajorDto;
import broteam.myfap.backend.Dto.Major.MajorRequestDto;
import broteam.myfap.backend.Dto.Time.GroupSlotDto;
import broteam.myfap.backend.Dto.Time.GroupSlotRequestDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IGroupSlotService {

    List<GroupSlotDto> findAllBase();

    @Transactional
    GroupSlotDto createNewGroup(GroupSlotRequestDto newGroup);

    GroupSlotDto findById(int id);

    @Transactional
    GroupSlotDto updateGroup(int id, GroupSlotRequestDto updatedGroup);

    @Transactional
    GroupSlotDto deleteGroup(int id);
}
