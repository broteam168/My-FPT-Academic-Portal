package broteam.myfap.backend.Controllers.Time;

import broteam.myfap.backend.Dto.Academic.CourseDto;
import broteam.myfap.backend.Dto.Academic.CourseRequest1Dto;
import broteam.myfap.backend.Dto.Academic.ReturnCourseDto;
import broteam.myfap.backend.Dto.Academic.SemesterRequestDto;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Dto.Time.RequestSessionDto;
import broteam.myfap.backend.Dto.Time.SessionDto;
import broteam.myfap.backend.Dto.Time.SlotDto;
import broteam.myfap.backend.Dto.Time.SlotRequestDto;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Service.Time.ISessionService;
import broteam.myfap.backend.Service.Time.SlotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/time/session")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SessionController {
    private final ISessionService sessionService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllBase() {
        List<SessionDto> allGroup = sessionService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allGroup)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @GetMapping("search")
    public ResponseEntity<ResponseObject> getAllBase(@RequestParam(name = "schoolid") Optional<Integer> schoolId, @RequestParam(name = "classid") Optional<Integer> classId) {
        List<SessionDto> allsession = new ArrayList<>();
        allsession = sessionService.findBySchoolAndClass(schoolId, classId);
        return ResponseEntity.ok(ResponseObject.builder().data(allsession).message("Get successful").responseCode(HttpStatus.OK.value()).build());
    }

    @GetMapping("search1")
    public ResponseEntity<ResponseObject> getAllByCourseId(@RequestParam(name = "courseId") int courseId) {
        List<SessionDto> allsession = new ArrayList<>();
        allsession = sessionService.findByCourseId(courseId);
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allsession)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @PostMapping
    public ResponseEntity<ResponseObject> createSessions(@Valid @RequestBody RequestSessionDto newSession) {
        String returnMessage = "Create successfully";
        int responseCode = HttpStatus.OK.value();
        List<SessionDto> returnCourses = new ArrayList<>();
        try {
            returnCourses = sessionService.addCoursesByCourse(newSession);
        } catch (Exception e) {
            returnMessage = e.getLocalizedMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        }

        return ResponseEntity.ok(ResponseObject.builder().data(returnCourses).message(returnMessage).responseCode(responseCode).build());
    }
}
