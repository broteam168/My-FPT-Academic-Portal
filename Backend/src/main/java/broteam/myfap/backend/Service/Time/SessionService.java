package broteam.myfap.backend.Service.Time;

import broteam.myfap.backend.Dto.Academic.CourseDto;
import broteam.myfap.backend.Dto.Academic.RequestCourseDto;
import broteam.myfap.backend.Dto.Academic.SubjectDto;
import broteam.myfap.backend.Dto.Academic.SyllabusDto;
import broteam.myfap.backend.Dto.Time.GroupSlotDto;
import broteam.myfap.backend.Dto.Time.RequestSessionDto;
import broteam.myfap.backend.Dto.Time.SessionDto;
import broteam.myfap.backend.Dto.Time.SlotDto;
import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Models.Academic.Course;
import broteam.myfap.backend.Models.Time.Session;
import broteam.myfap.backend.Repository.Time.SessionRepository;
import broteam.myfap.backend.Service.Academic.Implementation.CourseService;
import broteam.myfap.backend.Service.Academic.Interface.ISyllabusService;
import broteam.myfap.backend.Service.Unit.ClassService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SessionService implements ISessionService {
    private final SessionRepository sessionRepository;
    private final ModelMapper modelMapper = new ModelMapper();
    private final ClassService classService;
    private final GroupSlotService groupSlotService;
    private final SlotService slotService;
    private final ISyllabusService syllabusService;
    private final CourseService courseService;

    @Override
    public List<SessionDto> findAllBase() {
        List<SessionDto> results = new ArrayList<>();
        for (Session session : sessionRepository.findAll()) {
            results.add(modelMapper.map(session, SessionDto.class));
        }
        return results;
    }

    @Override
    public List<SessionDto> findBySchoolAndClass(Optional<Integer> schoolId, Optional<Integer> classid) {
        List<SessionDto> results = new ArrayList<>();

        if (schoolId.isEmpty()) {
            return findAllBase();

        } else {
            List<ClassDto> classes = classService.FindBySchoolId(schoolId.get());
            if (!classid.isEmpty()) {
                classes = classes.stream().filter(x -> x.getId() == classid.get()).toList();
            }
            for (ClassDto dto : classes) {
                List<Session> courses = sessionRepository.findByClassId(dto.getId());
                for (Session session : courses) {
                    results.add(modelMapper.map(session, SessionDto.class));
                }
            }
        }
        return results;
    }

    @Override
    public List<SessionDto> findByCourseId(int courseId) {
        List<SessionDto> results = new ArrayList<>();
        List<Session> entities = sessionRepository.findByCourseId(courseId);
        for (Session entity : entities) {
            results.add(modelMapper.map(entity, SessionDto.class));
        }
        return results;
    }


    @Transactional
    @Override
    public List<SessionDto> addCoursesByCourse(RequestSessionDto newData) throws ParseException {
//        List<Session> li = sessionRepository.findByCourseId(newData.getCourseId());
//        if(li.stream().anyMatch(x-> Objects.equals(x.getStatus(), "NOT YET")))
//            throw new RuntimeException("Cannot create duplicate!");

        CourseDto currentCourse = courseService.findById(newData.getCourseId());

        GroupSlotDto currentGroup = groupSlotService.getCurrentGroupSlot();
        List<SlotDto> slotDtos = slotService.FindByGroupId(currentGroup.getId());
        String[] slots = currentCourse.getSlots().split(",");
        for (String slot : slots) {
            if (slotDtos.stream().noneMatch(x -> x.getOrder() == Integer.parseInt(slot) && x.isIsActive()))
                throw new RuntimeException("Cannot find slot information!");
        }
        if (currentCourse == null) throw new RuntimeException("Cannot find course!");

        SubjectDto currentSubject = currentCourse.getSubject();
        SyllabusDto currentSyllabus = syllabusService.findCurrentSyllabus(currentSubject.getId());
        if (currentSyllabus == null) throw new RuntimeException("Cannot find syllabus!");

        int totalSlots = currentSyllabus.getSlot();
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
        ZoneId zoneId = ZoneId.of("UTC+07");
        df.setTimeZone(TimeZone.getTimeZone(zoneId));
        Date temp = df.parse("03/02/2024");

        Calendar calendar = Calendar.getInstance();

        calendar.setTime(temp);
        System.out.println(calendar.getTime());
        int currentIndex = 0;
        String[] days = currentCourse.getDays().split(",");

        while (totalSlots > 0) {

            for (String day : days) {
                int current;
                switch (day) {
                    case "2":
                        current = Calendar.MONDAY;
                        break;
                    case "3":
                        current = Calendar.TUESDAY;
                        break;
                    case "4":
                        current = Calendar.WEDNESDAY;
                        break;
                    case "5":
                        current = Calendar.THURSDAY;
                        break;
                    case "6":
                        current = Calendar.FRIDAY;
                        break;
                    case "7":
                        current = Calendar.SATURDAY;
                        break;
                    case "8":
                        current = Calendar.SUNDAY;
                        break;
                    default:
                        current = Calendar.MONDAY;
                        break;
                }
                while (calendar.get(Calendar.DAY_OF_WEEK) != current) {
                    calendar.add(Calendar.DATE, 1);
                }
                Session session = new Session();
                session.setCourse(modelMapper.map(currentCourse, Course.class));
                session.setName(currentCourse.getId()+"_"+currentCourse.getName()+"_Slot"+(currentSyllabus.getSlot()-totalSlots+1));
                if (currentIndex == slots.length) currentIndex = 0;
                int finalCurrentIndex = currentIndex;
                SlotDto currentS =  slotDtos.stream().filter(x -> x.getOrder() == Integer.parseInt(slots[finalCurrentIndex])).toList().get(0);

                session.setSlot(Integer.parseInt(slots[finalCurrentIndex]));
                session.setStartTime(java.sql.Time.valueOf(currentS.getStartTime().split("\\.")[0]));
                session.setEndTime(java.sql.Time.valueOf(currentS.getEndTime().split("\\.")[0]));
                session.setCoursei(currentCourse.getId());

                session.setDateDay(calendar.getTime());
                session.setStatus("NOT YET");
                sessionRepository.save(session);
                currentIndex++;

                calendar.add(Calendar.DATE, 1);
                totalSlots--;
                if (totalSlots == 0) break;
            }

        }
        currentCourse.setStatus("ASSIGNED");
        RequestCourseDto newRequest = new RequestCourseDto();
        newRequest.setId(currentCourse.getId());
        newRequest.setName(currentCourse.getName());
        newRequest.setStatus(currentCourse.getStatus());
        newRequest.setDays(currentCourse.getDays());
        newRequest.setSlots(currentCourse.getSlots());
        newRequest.setClassId(currentCourse.getClasss().getId());
        newRequest.setRoomId(currentCourse.getRoom().getId());
        newRequest.setSemesterId(currentCourse.getSemester().getId());
        newRequest.setSubjectId(currentCourse.getSubject().getId());
        newRequest.setSubMajorId(currentCourse.getSubMajor().getId());
        courseService.updateCourse(currentCourse.getId(),newRequest,false);
        return null;
    }
}
