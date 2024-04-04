package broteam.myfap.backend.Controllers.Academic;

import broteam.myfap.backend.Dto.Academic.SemesterDto;
import broteam.myfap.backend.Dto.Academic.SemesterRequestDto;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Service.Academic.Interface.ISemesterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academic/semester")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SemesterController {
    private final ISemesterService semesterService;
    @GetMapping
    public ResponseEntity<ResponseObject> getAllBase() {
         List<SemesterDto> allSemester = semesterService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allSemester)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @PostMapping
    public ResponseEntity<ResponseObject> CreateSemester(@Valid @RequestBody SemesterRequestDto newSemester) {
        String returnMessage = "Create Successfully";
        int resposeCode = HttpStatus.OK.value();
        SemesterDto returnSemester = new SemesterDto();
        try {
            returnSemester = semesterService.createNewSemester(newSemester);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSemester)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> Get(@Valid @PathVariable int id) {
        String returnMessage = "GET Successfully";
        int resposeCode = HttpStatus.OK.value();
        SemesterRequestDto returnSemester = new SemesterRequestDto();
        try {
            returnSemester = semesterService.findById(id);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSemester)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> updateSemester(@Valid @PathVariable int id,@Valid @RequestBody SemesterRequestDto newClass) {
        String returnMessage = "Update Successfully";
        int resposeCode = HttpStatus.OK.value();
        SemesterDto returnMajor = new SemesterDto();
        try {
            returnMajor = semesterService.updateSemester(id,newClass);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnMajor)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @DeleteMapping("{id}")
    public ResponseEntity<ResponseObject> deleteSemester(@Valid @PathVariable int id) {
        String returnMessage = "Delete Successfully";
        int resposeCode = HttpStatus.OK.value();
        SemesterDto returnSemester = new SemesterDto();
        try {
            returnSemester = semesterService.deleteMajor(id);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSemester)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
}
