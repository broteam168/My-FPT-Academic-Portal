package broteam.myfap.backend.Controllers.Major;

import broteam.myfap.backend.Dto.Major.MajorDto;
import broteam.myfap.backend.Dto.Major.MajorRequestDto;
import broteam.myfap.backend.Dto.Major.SubMajorDto;
import broteam.myfap.backend.Dto.Major.SubMajorRequestDto;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Dto.Unit.ClassRequest;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Service.Major.IMajorService;
import broteam.myfap.backend.Service.Major.ISubMajorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/submajor")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SubMajorController {
    private final ISubMajorService service;
    @GetMapping
    public ResponseEntity<ResponseObject> GetAllSubMajorBase() {
        List<SubMajorDto> allSubMajors = service.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allSubMajors)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> getDetailedSubMajor(@Valid @PathVariable int id) {
        String returnMessage = "Get Successfully";
        int resposeCode = HttpStatus.OK.value();
        SubMajorDto returnSubMajor = new SubMajorDto();
        try {
            returnSubMajor = service.findById(id);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSubMajor)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @GetMapping("search")
    public ResponseEntity<ResponseObject> getAllSubMajor(@RequestParam(name = "majorId") @Valid int majorId) {
        List<SubMajorDto> allSubMajor = service.FindByMajorId(majorId);
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allSubMajor)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @PostMapping
    public ResponseEntity<ResponseObject> CreateNewSubMajor(@Valid @RequestBody SubMajorRequestDto newMajor) {
        String returnMessage = "Create Successfully";
        int resposeCode = HttpStatus.OK.value();
        SubMajorDto returnSubMajor = new SubMajorDto();
        try {
            returnSubMajor = service.createNewSubMajor(newMajor);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSubMajor)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> updateSubMajor(@Valid @PathVariable int id,@Valid @RequestBody SubMajorRequestDto update) {
        String returnMessage = "Update Successfully";
        int resposeCode = HttpStatus.OK.value();
        SubMajorDto returnSubMajor = new SubMajorDto();
        try {
            returnSubMajor = service.updateSubMajor(id,update);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSubMajor)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @DeleteMapping("{id}")
    public ResponseEntity<ResponseObject> deleteSubMajor(@Valid @PathVariable int id) {
        String returnMessage = "Delete Successfully";
        int resposeCode = HttpStatus.OK.value();
        SubMajorDto returnClass = new SubMajorDto();
        try {
            returnClass = service.deleteById(id);
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
