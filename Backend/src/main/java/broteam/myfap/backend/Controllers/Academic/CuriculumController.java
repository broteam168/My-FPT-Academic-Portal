package broteam.myfap.backend.Controllers.Academic;

import broteam.myfap.backend.Dto.Academic.CuriculumDto;
import broteam.myfap.backend.Dto.Academic.CuriculumRequest;
import broteam.myfap.backend.Dto.Academic.SubjectDto;

import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Exception.Academic.CuriculumException;

import broteam.myfap.backend.Service.Academic.Implementation.CuriculumService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academic/curiculum")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CuriculumController {
    private final CuriculumService curiculumService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllCuriculum() {
        List<CuriculumDto> allCuriculum = curiculumService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allCuriculum)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> getCuriculumById(@Valid @PathVariable int id) {
        String returnMessage = "Get Successfully";
        int responseCode = HttpStatus.OK.value();
        CuriculumDto returnCuriculum = new CuriculumDto();
        try {
            returnCuriculum = curiculumService.findCuriculumById(id);
        } catch (Exception e) {
            returnMessage = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnCuriculum)
                .message(returnMessage)
                .responseCode(responseCode)
                .build());
    }

    @GetMapping("search")
    public ResponseEntity<ResponseObject> getCuriBySubMajorId(@RequestParam(name = "subMajorId") @Valid int subMajorId) {
        List<CuriculumDto> allCuriculum = curiculumService.findCuriBySubMajorId(subMajorId);
        return ResponseEntity.ok(ResponseObject.builder()
                        .data(allCuriculum)
                        .message("Get successful")
                        .responseCode(HttpStatus.OK.value())
                .build());
    }

    @GetMapping("searchSubject")
    public ResponseEntity<ResponseObject> getSubjectByCuriculum(@RequestParam(name = "subjectId") @Valid int subjectId) {
        String returnMessage = "Get Successfully";
        int responseCode = HttpStatus.OK.value();
        SubjectDto returnSubject = new SubjectDto();
        try {
            returnSubject = curiculumService.getSubjectByCuriculum(subjectId);
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
    public ResponseEntity<ResponseObject> createCuriculum(@Valid @RequestBody CuriculumRequest newCuriculum) {
        String returnMessage = "Create successfully";
        int responseCode = HttpStatus.OK.value();
        CuriculumDto returnCuriculum = new CuriculumDto();
        try {
            returnCuriculum = curiculumService.createNewCuriculum(newCuriculum);
        } catch (Exception e) {
            returnMessage = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        }

        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnCuriculum)
                .message(returnMessage)
                .responseCode(responseCode)
                .build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ResponseObject> deleteCuriculum(@Valid @PathVariable int id) {
        String returnMsg = "Delete successfully";
        int responseCode = HttpStatus.OK.value();
        CuriculumDto returnCuriculum = new CuriculumDto();
        try {
            returnCuriculum = curiculumService.deleteCuriculum(id);
        } catch (Exception e) {
            returnMsg = e.getMessage();
            responseCode = HttpStatus.OK.value();
        }

        return ResponseEntity.ok(ResponseObject.builder()
                        .data(returnCuriculum)
                        .message(returnMsg)
                        .responseCode(responseCode)
                        .build());
    }

    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> updateCuriculum(@Valid @PathVariable int id, @Valid @RequestBody CuriculumRequest newCuriculum) {
        String returnMsg = "Update Successfully";
        int responseCode = HttpStatus.OK.value();
        CuriculumDto returnCuriculum = new CuriculumDto();
        try {
            returnCuriculum = curiculumService.updateCuriculum(id, newCuriculum);
        } catch (CuriculumException e) {
            returnMsg = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        } catch (Exception e1) {
            returnMsg = e1.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        }

        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnCuriculum)
                .message(returnMsg)
                .responseCode(responseCode)
                .build());
    }


}
