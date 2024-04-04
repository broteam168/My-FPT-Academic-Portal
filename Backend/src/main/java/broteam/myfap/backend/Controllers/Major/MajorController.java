package broteam.myfap.backend.Controllers.Major;

import broteam.myfap.backend.Dto.Major.MajorDto;
import broteam.myfap.backend.Dto.Major.MajorRequestDto;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Dto.Unit.ClassRequest;
import broteam.myfap.backend.Dto.Unit.SchoolDto;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Service.Major.IMajorService;
import broteam.myfap.backend.Service.Major.MajorService;
import broteam.myfap.backend.Service.Unit.SchoolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/major")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class MajorController {
    private final IMajorService majorService;
    @GetMapping
    public ResponseEntity<ResponseObject> GetAllMajorBase() {
         List<MajorDto> allMajors = majorService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allMajors)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> Get(@Valid @PathVariable int id) {
        String returnMessage = "GET Successfully";
        int resposeCode = HttpStatus.OK.value();
        MajorDto returnMajor = new MajorDto();
        try {
            returnMajor = majorService.findMajorById(id);
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
    @PostMapping
    public ResponseEntity<ResponseObject> CreateNewMajor(@Valid @RequestBody MajorRequestDto newMajor) {
        String returnMessage = "Create Successfully";
        int resposeCode = HttpStatus.OK.value();
        MajorDto returnMajor = new MajorDto();
        try {
            returnMajor = majorService.createNewMajor(newMajor);
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
    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> updateMajor(@Valid @PathVariable int id,@Valid @RequestBody MajorRequestDto newClass) {
        String returnMessage = "Update Successfully";
        int resposeCode = HttpStatus.OK.value();
        MajorDto returnMajor = new MajorDto();
        try {
            returnMajor = majorService.updateMajor(id,newClass);
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
    public ResponseEntity<ResponseObject> deleteMajor(@Valid @PathVariable int id) {
        String returnMessage = "Delete Successfully";
        int resposeCode = HttpStatus.OK.value();
        MajorDto returnMajor = new MajorDto();
        try {
            returnMajor = majorService.deleteMajor(id);
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
}
