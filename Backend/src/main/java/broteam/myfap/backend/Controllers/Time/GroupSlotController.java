package broteam.myfap.backend.Controllers.Time;

import broteam.myfap.backend.Converter.Unit.UnitConverter;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Dto.Time.GroupSlotDto;
import broteam.myfap.backend.Dto.Time.GroupSlotRequestDto;
import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Dto.Unit.SchoolDto;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Models.Unit.School;
import broteam.myfap.backend.Service.Time.GroupSlotService;
import broteam.myfap.backend.Service.Unit.SchoolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/time/groupslot")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class GroupSlotController {
    private final GroupSlotService groupSlotService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllGroupSlot() {
        List<GroupSlotDto> allGroup = groupSlotService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allGroup)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @PostMapping
    public ResponseEntity<ResponseObject> CreateGroup(@Valid @RequestBody GroupSlotRequestDto newGroup) {
        String returnMessage = "Create Successfully";
        int resposeCode = HttpStatus.OK.value();
        GroupSlotDto returnGroup = new GroupSlotDto();
        try {
            returnGroup = groupSlotService.createNewGroup(newGroup);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = "Some error occurs";
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnGroup)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> GetDetailed(@PathVariable @Valid String id) {
        String returnMessage = "Get Successfully";
        int resposeCode = HttpStatus.OK.value();
        GroupSlotDto returnGroup = new GroupSlotDto();

        try
        {
            returnGroup =  groupSlotService.findById(Integer.parseInt(id));
        }
        catch (Exception ex)
        {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnGroup)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }

    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> UpdateGroup(@Valid @PathVariable int id, @Valid @RequestBody GroupSlotRequestDto updateGroup) {
        String returnMessage = "Update Successfully";
        int resposeCode = HttpStatus.OK.value();
        GroupSlotDto returnGroup = new GroupSlotDto();
        try {
            returnGroup = groupSlotService.updateGroup(id,updateGroup);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = "Some error occurs";
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnGroup)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @DeleteMapping("{id}")
    public ResponseEntity<ResponseObject> DeleteGroup(@Valid @PathVariable int id) {
        String returnMessage = "Delete Successfully";
        int resposeCode = HttpStatus.OK.value();
        GroupSlotDto returnGroup = new GroupSlotDto();
        try {
            returnGroup = groupSlotService.deleteGroup(id);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = "Some error occurs";
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnGroup)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
}
