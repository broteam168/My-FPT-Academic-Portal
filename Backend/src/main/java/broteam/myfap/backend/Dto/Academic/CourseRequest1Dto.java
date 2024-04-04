package broteam.myfap.backend.Dto.Academic;

import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Models.Major.SubMajor2;
import broteam.myfap.backend.Models.Unit.Room;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class CourseRequest1Dto {
    private int classId;
    private int semester;
}
