package broteam.myfap.backend.Service.Academic.Implementation;

import broteam.myfap.backend.Converter.Academic.AcademicConverter;
import broteam.myfap.backend.Dto.Academic.*;
import broteam.myfap.backend.Dto.Major.SubMajorDto;
import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Models.Academic.Course;
import broteam.myfap.backend.Models.Academic.RequestCourse;
import broteam.myfap.backend.Repository.Academic.CourseRequestRespository;
import broteam.myfap.backend.Repository.Academic.CourseRespository;
import broteam.myfap.backend.Service.Academic.Interface.ICourseService;
import broteam.myfap.backend.Service.Major.SubMajorService;
import broteam.myfap.backend.Service.Unit.ClassService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseService implements ICourseService {
    private final CourseRespository courseRespository;
    private final CourseRequestRespository courseRequestRespository;

    private final AcademicConverter academicConverter;
    private final ClassService classService;
    private final SemesterService semesterService;
    private final SubMajorService subMajorService;
    private final CuriculumService curiculumService;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<CourseDto> findAllBase() {
        List<CourseDto> results = new ArrayList<>();
        for (Course course : courseRespository.findAll()) {
            results.add(modelMapper.map(course, CourseDto.class));
        }
        return results;
    }

    @Transactional
    @Override
    public CourseDto findById(int id) {
        Optional<Course> course = courseRespository.findById(id);
        if (course.isEmpty()) throw new NotFoundException("Cannot find course");
        return modelMapper.map(course.get(), CourseDto.class);
    }

    @Transactional
    @Override
    public ReturnCourseDto updateCourse(int id, RequestCourseDto updatedCourse, boolean active) {
        RequestCourse base = modelMapper.map(updatedCourse, RequestCourse.class);
        if (active) {
            base.setStatus("ASSIGN");
        }
        Optional<RequestCourse> duplicate = courseRequestRespository.findById(id);

        if (duplicate.isPresent()) {

            List<RequestCourse> du = courseRequestRespository.findByRoomId(base.getRoomId());

            if (du.stream().count() > 0) for (RequestCourse item : du)
                if (item.getId() != duplicate.get().getId()) {
                    if (updatedCourse.getSemesterId() == item.getSemesterId())
                        if ((item.getSlots().charAt(0) == updatedCourse.getSlots().charAt(0) && item.getDays().charAt(0) == updatedCourse.getDays().charAt(0)) || (item.getSlots().charAt(2) == updatedCourse.getSlots().charAt(2) && item.getDays().charAt(2) == updatedCourse.getDays().charAt(2)))
                            throw new RuntimeException("Room is used");
                }
            base.setTeacherId(duplicate.get().getTeacherId());
            base.setId(duplicate.get().getId());
            courseRequestRespository.save(base);
        }
        return modelMapper.map(base, ReturnCourseDto.class);
    }

    @Transactional
    @Override
    public List<ReturnCourseDto> addCoursesByClasses(CourseRequest1Dto newData) {

        List<ReturnCourseDto> results = new ArrayList<>();

        ///Get current class
        ClassDto currentClass = classService.findClassById(newData.getClassId());

        /// Get current semester
        SemesterDto currentSemester = semesterService.getCurrentSemester();
        if (newData.getSemester() < 5) {
            List<SubMajorDto> gotSub = subMajorService.FindByMajorId(currentClass.getMajor().getId());
            SubMajorDto common = gotSub.stream().filter(x -> x.isIsCommon()).toList().get(0);
            List<CuriculumDto> curiculumDtos = curiculumService.findCuriBySubMajorIdAndSememster(common.getId(), newData.getSemester());
            if (curiculumDtos.stream().count() == 0)
                throw new RuntimeException("No subject in semester and major. Please create!");
            for (CuriculumDto dto : curiculumDtos) {
                RequestCourse newCourse = new RequestCourse();
                newCourse.setClassId(currentClass.getId());
                newCourse.setName(currentClass.getName() + "_" + dto.getSubject().getSubjectCode());
                newCourse.setStatus("DRAFT");
                newCourse.setSemesterId(currentSemester.getId());
                newCourse.setSubMajorId(common.getId());
                newCourse.setSubjectId(dto.getSubject().getId());
                newCourse.setRoomId(null);
                RequestCourse retur = courseRequestRespository.save(newCourse);
                if (retur != null) results.add(modelMapper.map(retur, ReturnCourseDto.class));
            }
        }
        return results;
    }

    @Override
    public List<CourseDto> findBySchoolAndClass(Optional<Integer> schoolId, Optional<Integer> classid) {
        List<CourseDto> results = new ArrayList<>();

        if (schoolId.isEmpty()) {
            return findAllBase();

        } else {
            List<ClassDto> classes = classService.FindBySchoolId(schoolId.get());
            if (!classid.isEmpty()) {
                classes = classes.stream().filter(x -> x.getId() == classid.get()).toList();
            }
            for (ClassDto dto : classes) {
                List<Course> courses = courseRespository.findByClassId(dto.getId());
                for (Course course : courses) {
                    results.add(modelMapper.map(course, CourseDto.class));
                }
            }
        }
        return results;
    }

    @Transactional
    @Override
    public RequestCourseDto deleteById(int id) {

        Optional<RequestCourse> duplicate2 = courseRequestRespository.findById(id);
        if (duplicate2.isEmpty()) throw new NotFoundException("Cannot find semester");
        if (!Objects.equals(duplicate2.get().getStatus(), "DRAFT"))
            throw new NotFoundException("Cannot delete start course");
        courseRequestRespository.deleteById(id);

        return modelMapper.map(duplicate2.get(), RequestCourseDto.class);
    }
}
