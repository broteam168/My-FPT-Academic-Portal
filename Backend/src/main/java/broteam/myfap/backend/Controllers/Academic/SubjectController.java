package broteam.myfap.backend.Controllers.Academic;

import broteam.myfap.backend.Converter.Academic.AcademicConverter;
import broteam.myfap.backend.Dto.Academic.SubjectDto;
import broteam.myfap.backend.Dto.ResponseObject;

import broteam.myfap.backend.Exception.Academic.SubjectException;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Models.Academic.Subject;


import broteam.myfap.backend.Service.Academic.Implementation.SubjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academic/subject")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SubjectController {
    private final SubjectService subjectService;
    private final AcademicConverter academicConverter;
    @GetMapping
    public ResponseEntity<ResponseObject> GetAllScholls() {
        List<SubjectDto> allSubjects = subjectService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allSubjects)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());

    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> GetDetailedSubject(@PathVariable @Valid String id) {
        String returnMessage = "Create Successfully";
        int responseCode = HttpStatus.OK.value();
        SubjectDto returnSubject = new SubjectDto();
        try {
            returnSubject = academicConverter.toDto(subjectService.findSubjectById(Integer.parseInt(id)));
        } catch (Exception e) {
            returnMessage = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        }

        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSubject)
                .message(returnMessage)
                .responseCode(responseCode)
                .build());
    }

    @PostMapping
    public ResponseEntity<ResponseObject> CreateSubject(@Valid @RequestBody SubjectDto newSubject) {
        String returnMessage = "Create Successfully";
        int responseCode = HttpStatus.OK.value();
        SubjectDto returnSubject = new SubjectDto();
        try {
            returnSubject = subjectService.createNewSubject(newSubject);
        } catch (SubjectException e) {
            returnMessage = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        } catch (Exception e2) {
            returnMessage = "Some error occus";
            responseCode = HttpStatus.ACCEPTED.value();
        }

        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSubject)
                .message(returnMessage)
                .responseCode(responseCode)
                .build());
    }

    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> CreateSubject(@Valid @PathVariable int id, @Valid @RequestBody SubjectDto newSubject) {
        String returnMessage = "Update Successfully";
        int responseCode = HttpStatus.OK.value();
        SubjectDto returnSubject = new SubjectDto();
        try {
            returnSubject = subjectService.updateSubject(id, newSubject);
        } catch (SubjectException e) {
            returnMessage = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        } catch (Exception e2) {
            returnMessage = "Some error occus";
            responseCode = HttpStatus.ACCEPTED.value();
        }

        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSubject)
                .message(returnMessage)
                .responseCode(responseCode)
                .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ResponseObject> DeleteSubject(@Valid @PathVariable int id) {
        String returnMessage = "Delete Successfully";
        int responseCode = HttpStatus.OK.value();
        Subject returnSubject = new Subject();
        try {
            returnSubject = subjectService.deleteSubject(id);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = "Some error occurs";
            responseCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(academicConverter.toDto(returnSubject))
                .message(returnMessage)
                .responseCode(responseCode)
                .build());
    }

}
