package broteam.myfap.backend.Dto.Academic;

import broteam.myfap.backend.Dto.Unit.ClassDto;
import broteam.myfap.backend.Models.Academic.Semester;
import broteam.myfap.backend.Models.Academic.Subject;
import broteam.myfap.backend.Models.Major.SubMajor;
import broteam.myfap.backend.Models.Major.SubMajor2;
import broteam.myfap.backend.Models.Unit.Class;
import broteam.myfap.backend.Models.Unit.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CourseDto {
    private int id;
    private String Name;
    private String Status;
    private String Slots;
    private String Days;
    private ClassDto classs;
    private SubMajor2 subMajor;
    private Room room;
    private SemesterDto semester;

    private SubjectDto subject;
//    @ManyToOne
//    @JoinColumn(name = "teacherId", insertable = false, updatable = false)
//    private Semester semester;


}
