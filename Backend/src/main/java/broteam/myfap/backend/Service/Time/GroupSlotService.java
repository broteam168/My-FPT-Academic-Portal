package broteam.myfap.backend.Service.Time;

import broteam.myfap.backend.Converter.Time.SlotConverter;
import broteam.myfap.backend.Dto.Academic.SemesterDto;
import broteam.myfap.backend.Dto.Time.GroupSlotDto;
import broteam.myfap.backend.Dto.Time.GroupSlotRequestDto;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Models.Academic.Semester;
import broteam.myfap.backend.Models.Time.GroupSlot;
import broteam.myfap.backend.Repository.Time.GroupSlotRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupSlotService implements IGroupSlotService {
    private final GroupSlotRepository groupSlotRepository;
     private final SlotConverter slotConverter;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<GroupSlotDto> findAllBase() {
        List<GroupSlotDto> results = new ArrayList<>();
        for(GroupSlot school :  groupSlotRepository.findAll())
        {
            results.add(slotConverter.toDto(school));
        }
        return  results;
    }

    @Transactional
    @Override
    public GroupSlotDto createNewGroup(GroupSlotRequestDto newGroup) {
        GroupSlot baseClass = modelMapper.map(newGroup, GroupSlot.class);

        Optional<GroupSlot> duplicate = groupSlotRepository.findByName(baseClass.getName());
        if (duplicate.stream().count() > 0) {
            throw new SchoolException("Set name is already used");
        }
        GroupSlot createdSet = groupSlotRepository.save(baseClass);
        return slotConverter.toDto(createdSet);
    }
    @Override
    public GroupSlotDto findById(int id) {
        Optional<GroupSlot> gotGroup = groupSlotRepository.findById(id);
        if(gotGroup.isEmpty() ) throw new NotFoundException("Cannot find group");
        return slotConverter.toDto(gotGroup.get());
    }

    @Transactional
    @Override
    public GroupSlotDto updateGroup(int id, GroupSlotRequestDto updatedGroup) {
        GroupSlot baseGroup = modelMapper.map(updatedGroup, GroupSlot.class);

        Optional<GroupSlot> duplicate = groupSlotRepository.findById(id);
        Optional<GroupSlot> duplicate2 = groupSlotRepository.findByName(updatedGroup.getName());
        if(!duplicate.get().getName().equals(updatedGroup.getName()) && duplicate2.stream().count()>0)
            throw new SchoolException("Group name is already used");
        if(duplicate!=null) {

            baseGroup.setId(duplicate.get().getId());
            groupSlotRepository.save(baseGroup);
        }
        return slotConverter.toDto(baseGroup);
    }
    @Transactional
    @Override
    public GroupSlotDto deleteGroup(int id) {
        Optional<GroupSlot> duplicate2 = groupSlotRepository.findById(id);
        if(duplicate2.isEmpty())
            throw new NotFoundException("Cannot find group");
        groupSlotRepository.deleteById(id);
         return slotConverter.toDto(duplicate2.get());
    }

    public GroupSlotDto getCurrentGroupSlot()
    {
        List<GroupSlotDto> results = new ArrayList<>();
        for(GroupSlot groupSlot :  groupSlotRepository.findAll())
        {

            if(groupSlot.isIsActive()) results.add(slotConverter.toDto(groupSlot));
        }
        return results.get(0);
    }
}
