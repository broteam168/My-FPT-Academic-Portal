package broteam.myfap.backend.Controllers.Academic;

import broteam.myfap.backend.Dto.Academic.*;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Service.Academic.Implementation.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academic/student")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllStudent() {
        List<StudentDto> allStudent = studentService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                        .data(allStudent)
                        .message("Get successful")
                        .responseCode(HttpStatus.OK.value())
                .build());
    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> getStudentById(@Valid @PathVariable int id) {
        String returnMessage = "Get successfully";
        int responseCode = HttpStatus.OK.value();
        StudentRequest returnStudent = new StudentRequest();
        try {
            returnStudent = studentService.findStudentById(id);
        } catch (Exception e) {
            returnMessage = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                        .data(returnStudent)
                        .message(returnMessage)
                        .responseCode(responseCode)
                .build());
    }

    @GetMapping("search")
    public ResponseEntity<ResponseObject> getStudentByUserId(@RequestParam(name = "userId") @Valid int userId) {
        String returnMessage = "Get successfully";
        int responseCode = HttpStatus.OK.value();
        StudentDto returnStudent = new StudentDto();
        try {
            returnStudent = studentService.findStudentByUserId(userId);
        } catch (Exception e) {
            returnMessage = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnStudent)
                .message(returnMessage)
                .responseCode(responseCode)
                .build());
    }

    @GetMapping("search1")
    public ResponseEntity<ResponseObject> getCourseByStudentId(@RequestParam(name = "studentId") @Valid int studentId) {
        List<CourseDto2> allCourse = studentService.findCourseByStudentId(studentId);
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allCourse)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
}
