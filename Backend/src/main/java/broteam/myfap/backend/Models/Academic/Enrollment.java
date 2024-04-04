package broteam.myfap.backend.Models.Academic;

import broteam.myfap.backend.Models.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "A_Enrollment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "studentId")
    private int studentId;

    @ManyToOne
    @JoinColumn(name = "studentId", insertable = false, updatable = false)
    private Student student;

    @Column(name = "courseId")
    private int courseId;

    @Column(name = "type")
    private String type;

    @Column(name = "status")
    private boolean status;

    @Column(name = "quality")
    private String quality;

    @Column(name = "note")
    private String note;

    @Column(name = "createdAt")
    private Date createAt;

    @PrePersist
    protected void onDate() {
        createAt = new Date();
    }
}
