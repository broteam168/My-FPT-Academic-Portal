package broteam.myfap.backend.Models.Academic;

import broteam.myfap.backend.Models.Major.SubMajor2;
import broteam.myfap.backend.Models.Unit.Class;
import broteam.myfap.backend.Models.Unit.Room;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "A_Course")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestCourse {
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


    @Column(name = "ClassId")
    private Integer ClassId;

    @Column(name = "SubMajorId")
    private Integer SubMajorId;


    @Column(name = "RoomId")
    private Integer RoomId;;

    @Column(name = "SemesterId")
    private Integer SemesterId;

    @Column(name = "SubjectId")
    private Integer SubjectId;

    @Column(name = "TeacherId")
    private Integer TeacherId;


}
