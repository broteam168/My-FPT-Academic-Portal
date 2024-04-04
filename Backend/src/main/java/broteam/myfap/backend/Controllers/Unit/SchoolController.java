package broteam.myfap.backend.Controllers.Unit;

import broteam.myfap.backend.Converter.Unit.UnitConverter;
import broteam.myfap.backend.Dto.Auth.AuthRequest;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Dto.Unit.SchoolDto;
import broteam.myfap.backend.Dto.Unit.SchoolFullDto;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Models.Unit.School;
import broteam.myfap.backend.Service.Unit.ISchoolService;
import broteam.myfap.backend.Service.Unit.SchoolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/v1/unit/school")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SchoolController {
    private final SchoolService schoolService;

    @GetMapping
    public ResponseEntity<ResponseObject> GetAllSchools() {
        List<SchoolDto> allSchools = schoolService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allSchools)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @GetMapping("full")
    public ResponseEntity<ResponseObject> GetAllSchools2() {
        List<SchoolFullDto> allSchools = schoolService.findAllBaseFull();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allSchools)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    private final UnitConverter unitConverter;
    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> GetDetailedSchool(@PathVariable @Valid String id) {
        String returnMessage = "Create Successfully";
        int resposeCode = HttpStatus.OK.value();
        SchoolDto returnSchool = new SchoolDto();

        try
        {
            returnSchool = unitConverter.toDto( schoolService.findSchoolById(Integer.parseInt(id)));
        }
        catch (Exception ex)
        {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSchool)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @PostMapping
    public ResponseEntity<ResponseObject> CreateSchool(@Valid @RequestBody SchoolDto newSchool) {
        String returnMessage = "Create Successfully";
        int resposeCode = HttpStatus.OK.value();
        SchoolDto returnSchool = new SchoolDto();
        try {
            returnSchool = schoolService.createNewSchool(newSchool);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = "Some error occurs";
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSchool)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> UpdateSchool(@Valid @PathVariable int id, @Valid @RequestBody SchoolDto newSchool) {
        String returnMessage = "Update Successfully";
        int resposeCode = HttpStatus.OK.value();
        SchoolDto returnSchool = new SchoolDto();
        try {
            returnSchool = schoolService.updateSchool(id,newSchool);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = "Some error occurs";
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSchool)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @DeleteMapping("{id}")
    public ResponseEntity<ResponseObject> DeleteSchool(@Valid @PathVariable int id) {
        String returnMessage = "Update Successfully";
        int resposeCode = HttpStatus.OK.value();
        School returnSchool = new School();
        try {
            returnSchool = schoolService.deleteSchool(id);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = "Some error occurs";
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(unitConverter.toDto(returnSchool))
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
}
