package broteam.myfap.backend.Service.Unit;

import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Dto.Unit.ClassRequest;
import broteam.myfap.backend.Dto.Unit.RoomDto;
import broteam.myfap.backend.Dto.Unit.RoomRequestDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IRoomService {

    List<RoomDto> findAllBase();

    List<RoomDto> FindBySchoolId(int id);

    RoomDto findRoomById(int id);

    @Transactional
    RoomDto createNewRoom(RoomRequestDto newRoom);

    @Transactional
    RoomDto updateRoom(int id, RoomRequestDto newRoom);

    @Transactional
    RoomDto deleteById(int id);
}
