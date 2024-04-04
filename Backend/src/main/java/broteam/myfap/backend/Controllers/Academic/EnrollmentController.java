package broteam.myfap.backend.Controllers.Academic;

import broteam.myfap.backend.Dto.Academic.CuriculumDto;
import broteam.myfap.backend.Dto.Academic.EnrollmentDto;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Service.Academic.Implementation.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academic/enrollment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllEnrollment() {
        List<EnrollmentDto> allEnrollment = enrollmentService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                        .data(allEnrollment)
                        .message("Get successfull")
                        .responseCode(HttpStatus.OK.value())
                .build());
    }

    @GetMapping("{id}")
    public  ResponseEntity<ResponseObject> getEnrollmentById(@Valid @PathVariable int id) {
        String returnMessage = "Get successfully";
        int reponseCode = HttpStatus.OK.value();
        EnrollmentDto returnEnrollment = new EnrollmentDto();
        try {
            returnEnrollment = enrollmentService.findEnrollmentById(id);
        } catch (Exception e) {
            returnMessage = e.getMessage();
            reponseCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                        .data(returnEnrollment)
                        .message(returnMessage)
                        .responseCode(reponseCode)
                .build());
    }

    @GetMapping("search")
    public ResponseEntity<ResponseObject> getAllEnrollmentByStudentId(@RequestParam(name = "studentId") @Valid int studentId) {
        List<EnrollmentDto> allEnrollment = enrollmentService.findEnrollmentByStudentId(studentId);
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allEnrollment)
                .message("Get successfull")
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @PostMapping
    public ResponseEntity<ResponseObject> createEnrollment(@Valid @RequestBody EnrollmentDto newEnrollment) {
        String returnMessage = "Create successfully";
        int reponseCode = HttpStatus.OK.value();
        EnrollmentDto returnEnrollment = new EnrollmentDto();
        try {
            returnEnrollment = enrollmentService.createEnrollment(newEnrollment);
        } catch (Exception e) {
            returnMessage = e.getMessage();
            reponseCode = HttpStatus.ACCEPTED.value();
        }

        return ResponseEntity.ok(ResponseObject.builder()
                        .data(returnEnrollment)
                        .message(returnMessage)
                        .responseCode(reponseCode)
                .build());
    }
}
