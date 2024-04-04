package broteam.myfap.backend.Dto.Academic;


import broteam.myfap.backend.Models.Academic.Semester;
import broteam.myfap.backend.Models.Academic.Subject;
import broteam.myfap.backend.Models.Major.SubMajor2;
import broteam.myfap.backend.Models.Unit.Room;
import broteam.myfap.backend.Models.Unit.Class;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto2 {
    private int id;
    private String Name;
    private String Status;
    private String Slots;
    private String Days;
    private Class classs;
    private SubMajor2 subMajor;
    private Room room;
    private Semester semester;
    private Subject subject;
}
