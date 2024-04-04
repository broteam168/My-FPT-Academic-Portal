package broteam.myfap.backend.Service.Time;

import broteam.myfap.backend.Converter.Time.SlotConverter;
import broteam.myfap.backend.Dto.Time.SlotDto;
import broteam.myfap.backend.Dto.Time.SlotRequestDto;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Models.Time.GroupSlot;
import broteam.myfap.backend.Models.Time.Slot;
import broteam.myfap.backend.Repository.Time.SlotRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SlotService implements ISlotService {
    private final SlotRepository slotRepository;
     private final SlotConverter slotConverter;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<SlotDto> findAllBase() {
        List<SlotDto> results = new ArrayList<>();
        for(Slot slot :  slotRepository.findAll())
        {
            results.add(slotConverter.toDto(slot));
        }
        return  results;
    }
    @Override
    public List<SlotDto> FindByGroupId(int id) {
        List<SlotDto> results = new ArrayList<>();

        List<Slot> enitities = slotRepository.findByGroup(id);
        for(Slot enitity : enitities)
        {
            results.add(slotConverter.toDto(enitity));
        }
        return results;
    }
    @Transactional
    @Override
    public SlotDto createNewCLass(SlotRequestDto newSlot) {
        Slot baseSlot = modelMapper.map(newSlot, Slot.class);
        //// Find duplicate name
        List<Slot> duplicateName = slotRepository.findByGroupAndName(baseSlot.getId(),
                baseSlot.getName());
        if (duplicateName.stream().count() > 0) {
            throw new SchoolException("Slot name is already used");
        }
        //// Check order duplicated
        List<Slot> groupSlots = slotRepository.findByGroup(baseSlot.getId());
        for (Slot slot : groupSlots)
        {
            if(slot.getOrder() == baseSlot.getOrder())
            {
                throw new SchoolException("Slot order is already used");
            }
        }
        if(baseSlot.getOrder() > 0)
        {
            Slot createdClass = slotRepository.save(baseSlot);
            return slotConverter.toDto(createdClass);
        }
        return slotConverter.toDto(baseSlot);
    }
    @Transactional
    @Override
    public SlotDto updateClass(int id, SlotRequestDto newSlot) {
        Slot baseSlot = modelMapper.map(newSlot, Slot.class);
        //// Find duplicate name

        if(baseSlot.getOrder() > 0)
        {
            baseSlot.setId(id);
            Slot createdClass = slotRepository.save(baseSlot);
            return slotConverter.toDto(createdClass);
        }
        return slotConverter.toDto(baseSlot);
    }
    @Override
    public SlotDto findById(int id) {
        Optional<Slot> gotSlot = slotRepository.findById(id);
        if (gotSlot.isEmpty()) throw new NotFoundException("Cannot find slot");
        return slotConverter.toDto(gotSlot.get());
    }
    @Transactional
    @Override
    public SlotDto deleteById(int id) {
        Optional<Slot> duplicate2 = slotRepository.findById(id);
        if(duplicate2.isEmpty())
            throw new NotFoundException("Cannot find slot");
        slotRepository.deleteById(id);
        return slotConverter.toDto(duplicate2.get());
    }
}
