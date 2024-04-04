package broteam.myfap.backend.Controllers.Time;

import broteam.myfap.backend.Dto.Major.SubMajorDto;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Dto.Time.GroupSlotDto;
import broteam.myfap.backend.Dto.Time.GroupSlotRequestDto;
import broteam.myfap.backend.Dto.Time.SlotDto;
import broteam.myfap.backend.Dto.Time.SlotRequestDto;
import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Dto.Unit.ClassRequest;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Service.Time.GroupSlotService;
import broteam.myfap.backend.Service.Time.SlotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.patterns.ConcreteCflowPointcut;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/time/slot")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SlotController {
    private final SlotService slotService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllSlot() {
        List<SlotDto> allGroup = slotService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allGroup)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @GetMapping("search")
    public ResponseEntity<ResponseObject> getAllSlotBy(@RequestParam(name = "groupId") @Valid int groupId) {
        List<SlotDto> allSlot = slotService.FindByGroupId(groupId);
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allSlot)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @PostMapping
    public ResponseEntity<ResponseObject> createSlot(@Valid @RequestBody SlotRequestDto newSlot) {
        String returnMessage = "Create Successfully";
        int resposeCode = HttpStatus.OK.value();
        SlotDto returnSlot = new SlotDto();
        try {
            returnSlot = slotService.createNewCLass(newSlot);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSlot)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> getDetailedSlot(@Valid @PathVariable int id) {
        String returnMessage = "Get Successfully";
        int resposeCode = HttpStatus.OK.value();
        SlotDto returnSlot = new SlotDto();
        try {
            returnSlot = slotService.findById(id);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSlot)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }

    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> updateSlot(@Valid @PathVariable int id,@Valid @RequestBody SlotRequestDto newClass) {
        String returnMessage = "Update Successfully";
        int resposeCode = HttpStatus.OK.value();
        SlotDto returnSlot = new SlotDto();
        try {
            returnSlot = slotService.updateClass(id,newClass);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnSlot)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @DeleteMapping("{id}")
    public ResponseEntity<ResponseObject> DeleteSlot(@Valid @PathVariable int id) {
        String returnMessage = "Delete Successfully";
        int resposeCode = HttpStatus.OK.value();
        SlotDto returnGroup = new SlotDto();
        try {
            returnGroup = slotService.deleteById(id);
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
