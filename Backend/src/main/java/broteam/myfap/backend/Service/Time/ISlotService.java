package broteam.myfap.backend.Service.Time;

import broteam.myfap.backend.Dto.Time.GroupSlotDto;
import broteam.myfap.backend.Dto.Time.GroupSlotRequestDto;
import broteam.myfap.backend.Dto.Time.SlotDto;
import broteam.myfap.backend.Dto.Time.SlotRequestDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ISlotService {


    List<SlotDto> findAllBase();

    List<SlotDto> FindByGroupId(int id);

    @Transactional
    SlotDto createNewCLass(SlotRequestDto newSlot);

    @Transactional
    SlotDto updateClass(int id, SlotRequestDto newSlot);

    SlotDto findById(int id);

    @Transactional
    SlotDto deleteById(int id);
}
