package broteam.myfap.backend.Models.Academic;

import broteam.myfap.backend.Models.Major.SubMajor;
import broteam.myfap.backend.Models.Major.SubMajor2;
import broteam.myfap.backend.Models.Unit.Class;
import broteam.myfap.backend.Models.Unit.Room;
import broteam.myfap.backend.Models.Unit.School;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "A_Course")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String Name;


    @Column(name = "Status")
    private String Status;

    @Column(name = "Slots")
    private String Slots;

    @Column(name = "Days")
    private String Days;

    @ManyToOne
    @JoinColumn(name = "ClassId", insertable = false, updatable = false)
    private Class classs;

    @ManyToOne
    @JoinColumn(name = "SubMajorId", insertable = false, updatable = false)
    private SubMajor2 subMajor;

    @ManyToOne
    @JoinColumn(name = "RoomId", insertable = false, updatable = false)
    private Room room;

    @ManyToOne
    @JoinColumn(name = "SemesterId", insertable = false, updatable = false)
    private Semester semester;

    @ManyToOne
    @JoinColumn(name = "SubjectId", insertable = false, updatable = false)
    private Subject subject;
//    @ManyToOne
//    @JoinColumn(name = "teacherId", insertable = false, updatable = false)
//    private Semester semester;


}
