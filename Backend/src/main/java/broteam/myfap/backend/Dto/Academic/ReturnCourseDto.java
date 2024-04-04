package broteam.myfap.backend.Dto.Academic;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReturnCourseDto {
    private int id;

    private String Name;
    private String Status;
    private String Slots;
    private String Days;
    private Integer ClassId;
    private Integer SubMajorId;

    private Integer RoomId;
    private Integer SemesterId;
    private Integer SubjectId;
    private Integer TeacherId;
}
