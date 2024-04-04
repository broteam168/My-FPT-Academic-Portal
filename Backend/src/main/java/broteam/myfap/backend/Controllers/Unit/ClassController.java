package broteam.myfap.backend.Controllers.Unit;

import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Dto.Unit.ClassRequest;
import broteam.myfap.backend.Dto.Unit.SchoolDto;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Service.Unit.ClassService;
import broteam.myfap.backend.Service.Unit.SchoolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/unit/class")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ClassController {
    private final ClassService classService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllClass() {
        List<ClassDto> allClasses = classService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allClasses)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> getDetailedClass(@Valid @PathVariable int id) {
        String returnMessage = "Get Successfully";
        int resposeCode = HttpStatus.OK.value();
        ClassDto returnClass = new ClassDto();
        try {
            returnClass = classService.findClassById(id);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnClass)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @GetMapping("search")
    public ResponseEntity<ResponseObject> getAllClassBySchool(@RequestParam(name = "schoolid") @Valid int schoolId) {
        List<ClassDto> allClasses = classService.FindBySchoolId(schoolId);
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allClasses)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @PostMapping
    public ResponseEntity<ResponseObject> createClass(@Valid @RequestBody ClassRequest newClass) {
        String returnMessage = "Create Successfully";
        int resposeCode = HttpStatus.OK.value();
        ClassDto returnClass = new ClassDto();
        try {
            returnClass = classService.createNewCLass(newClass);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnClass)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> updateClass(@Valid @PathVariable int id,@Valid @RequestBody ClassRequest newClass) {
        String returnMessage = "Update Successfully";
        int resposeCode = HttpStatus.OK.value();
        ClassDto returnClass = new ClassDto();
        try {
            returnClass = classService.updateClass(id,newClass);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnClass)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @DeleteMapping("{id}")
    public ResponseEntity<ResponseObject> deleteClass(@Valid @PathVariable int id) {
        String returnMessage = "Delete Successfully";
        int resposeCode = HttpStatus.OK.value();
        ClassDto returnClass = new ClassDto();
        try {
            returnClass = classService.deleteById(id);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnClass)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
}
