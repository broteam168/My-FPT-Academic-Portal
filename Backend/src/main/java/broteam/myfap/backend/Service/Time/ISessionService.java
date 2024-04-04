package broteam.myfap.backend.Service.Time;

import broteam.myfap.backend.Dto.Time.RequestSessionDto;
import broteam.myfap.backend.Dto.Time.SessionDto;
import broteam.myfap.backend.Dto.Time.SlotDto;
import broteam.myfap.backend.Dto.Time.SlotRequestDto;
import jakarta.transaction.Transactional;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

public interface ISessionService {


    List<SessionDto> findAllBase();

    List<SessionDto> findBySchoolAndClass(Optional<Integer> schoolId, Optional<Integer> classid);

    List<SessionDto> findByCourseId(int courseId);

    @Transactional
    List<SessionDto> addCoursesByCourse(RequestSessionDto newData) throws ParseException;
}
