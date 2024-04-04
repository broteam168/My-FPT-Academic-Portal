package broteam.myfap.backend.Controllers.Academic;

import broteam.myfap.backend.Dto.Academic.*;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Exception.Unit.SchoolException;
import broteam.myfap.backend.Service.Academic.Interface.ICourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/academic/course")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class  CourseController {
    private final ICourseService courseService;

    @GetMapping
    public ResponseEntity<ResponseObject> getAllBase() {
        List<CourseDto> allSemester = courseService.findAllBase();
        return ResponseEntity.ok(ResponseObject.builder()
                .data(allSemester)
                .message("Get successful")
                .responseCode(HttpStatus.OK.value())
                .build());
    }
    @GetMapping("{id}")
    public ResponseEntity<ResponseObject> Get(@Valid @PathVariable int id) {
        String returnMessage = "GET Successfully";
        int resposeCode = HttpStatus.OK.value();
        CourseDto returnCourse = new CourseDto();
        try {
            returnCourse = courseService.findById(id);
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnCourse)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @PostMapping
    public ResponseEntity<ResponseObject> createCourse(@Valid @RequestBody CourseRequest1Dto newCourse) {
        String returnMessage = "Create successfully";
        int responseCode = HttpStatus.OK.value();
        List<ReturnCourseDto> returnCourses = new ArrayList<>();
        try {
            returnCourses = courseService.addCoursesByClasses(newCourse);
        } catch (Exception e) {
            returnMessage = e.getMessage();
            responseCode = HttpStatus.ACCEPTED.value();
        }

        return ResponseEntity.ok(ResponseObject.builder().data(returnCourses).message(returnMessage).responseCode(responseCode).build());
    }

    @GetMapping("search")
    public ResponseEntity<ResponseObject> getAllBase(@RequestParam(name = "schoolid") Optional<Integer> schoolId, @RequestParam(name = "classid") Optional<Integer> classId) {
        List<CourseDto> allSemester = new ArrayList<>();
        allSemester = courseService.findBySchoolAndClass(schoolId, classId);
        return ResponseEntity.ok(ResponseObject.builder().data(allSemester).message("Get successful").responseCode(HttpStatus.OK.value()).build());
    }

    @PutMapping("{id}")
    public ResponseEntity<ResponseObject> updateCourse(@Valid @PathVariable int id,@Valid @RequestBody RequestCourseDto newClass,@RequestParam("convert") Optional<Boolean> active) {
        String returnMessage = "Update Successfully";
        int resposeCode = HttpStatus.OK.value();
        ReturnCourseDto returnMajor = new ReturnCourseDto();
        try {
            if (active.isEmpty())
            returnMajor = courseService.updateCourse(id,newClass,false);
            else returnMajor = courseService.updateCourse(id,newClass,active.get());
        } catch (SchoolException ex) {
            returnMessage = ex.getMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        } catch (Exception ex2) {
            returnMessage = ex2.getLocalizedMessage();
            resposeCode = HttpStatus.ACCEPTED.value();
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .data(returnMajor)
                .message(returnMessage)
                .responseCode(resposeCode)
                .build());
    }
    @DeleteMapping("{id}")
    public ResponseEntity<ResponseObject> deleteCourse(@Valid @PathVariable int id) {
        String returnMessage = "Delete Successfully";
        int resposeCode = HttpStatus.OK.value();
        RequestCourseDto returnSemester = new RequestCourseDto();
        try {
            returnSemester = courseService.deleteById(id);
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
