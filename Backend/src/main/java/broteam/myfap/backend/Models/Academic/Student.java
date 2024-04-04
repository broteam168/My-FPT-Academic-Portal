package broteam.myfap.backend.Models.Academic;

import broteam.myfap.backend.Models.Unit.School;
import broteam.myfap.backend.Models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "A_Student")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "UserId")
    private int userId;

    @OneToOne
    @JoinColumn(name = "UserId", insertable = false, updatable = false)
    private User user;

    @Column(name = "SubMajorId")
    private int subMajorId;

    @Column(name = "Semester")
    private int semester;

    @Column(name = "SchoolId")
    private int schoolId;

    @Column(name = "ClassId")
    private int classId;

    @Column(name = "StudentCode")
    private String studentCode;

    @Column(name = "Dob")
    private Date dob;
}
