package broteam.myfap.backend.Models.Time;

import broteam.myfap.backend.Models.Academic.Course;
import broteam.myfap.backend.Models.Academic.Subject;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.util.Date;

@Entity
@Table(name = "T_Session")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String Name;

    @Column(name = "StartTime")
    private Time StartTime;

    @Column(name = "EndTime")
    private Time EndTime;

    @Column(name = "DateDay")
    private Date DateDay;

    @Column(name = "Status")
    private String Status;

    @Column(name = "CourseId")
    private Integer coursei;
    @Column(name = "Slot")
    private Integer Slot;

    @ManyToOne
    @JoinColumn(name = "CourseId", insertable = false, updatable = false)
    private Course course;
}
