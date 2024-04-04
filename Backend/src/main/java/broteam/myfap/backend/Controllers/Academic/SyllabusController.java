package broteam.myfap.backend.Controllers.Academic;

import broteam.myfap.backend.Dto.Academic.SyllabusDto;
import broteam.myfap.backend.Dto.ResponseObject;


import broteam.myfap.backend.Service.Academic.Implementation.SyllabusService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academic/syllabus")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SyllabusController {
    private final SyllabusService syllabusService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllSyllabus() {
        List<SyllabusDto> allSyllabus = syllabusService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allSyllabus)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> getSyllabusById(@Valid @PathVariable int id) {
        String returnMessage = "Get Successfully";
        int responseCode = HttpStatus.OK.value();
        SyllabusDto returnSyllabus = new SyllabusDto();
        try {
            returnSyllabus = syllabusService.findSyllabusById(id);
        } catch (Exception e) {
            returnMessage = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSyllabus)
                .message(returnMessage)
                .responseCode(responseCode)
                .build());
    }

    @GetMapping("search")
    public ResponseEntity<ResponseObject> getSyllabusBySubjectId(@RequestParam(name = "subjectId") @Valid int subjectId) {
        List<SyllabusDto> allSyllabus = syllabusService.findBySubjectId(subjectId);
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allSyllabus)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }

//    @PostMapping
//    public ResponseEntity<ResponseObject> createSyllabus(@RequestParam(name = "subjectId") @Valid int subjectId, @Valid )

    @PostMapping
    public ResponseEntity<ResponseObject> createSyllabus(@Valid @RequestBody SyllabusDto newSyllabus) {
        String returnMessage = "Create Successfully";
        int responseCode = HttpStatus.OK.value();
        SyllabusDto returnSyllabus = new SyllabusDto();
        try {
            returnSyllabus = syllabusService.createNewSyllabus(newSyllabus);
        } catch (Exception e) {
            returnMessage = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        }

        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSyllabus)
                .message(returnMessage)
                .responseCode(responseCode)
                .build());
    }

    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> updateSyllabus(@Valid @PathVariable int id, @Valid @RequestBody SyllabusDto newSyllabus) {
        String returnMsg = "Update Successfully";
        int resposeCode = HttpStatus.OK.value();
        SyllabusDto returnSyllabus = new SyllabusDto();

        try {
            returnSyllabus = syllabusService.updateSyllabusById(id, newSyllabus);
        } catch (Exception e) {
            returnMsg = e.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }

        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSyllabus)
                .message(returnMsg)
                .responseCode(resposeCode)
                .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ResponseObject> deleteSyllabus(@Valid @PathVariable int id) {
        String returnMsg = "Delete Successfully";
        int responseCode = HttpStatus.OK.value();
        SyllabusDto returnSyllabus = new SyllabusDto();
        try {
            returnSyllabus = syllabusService.deleteSyllabusById(id);
        } catch (Exception e) {
            returnMsg = e.getMessage();
            responseCode = HttpStatus.OK.value();
        }

        return ResponseEntity.ok(ResponseObject.builder()
                        .data(returnSyllabus)
                        .message(returnMsg)
                        .responseCode(responseCode)
                .build());
    }
}
