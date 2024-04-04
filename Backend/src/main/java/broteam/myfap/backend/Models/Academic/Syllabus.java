package broteam.myfap.backend.Models.Academic;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "A_Syllabus")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Syllabus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "StudentTasks")
    private String studentTasks;

    @Column(name = "Tools")
    private String tools;

    @Column(name = "ScoringScale")
    private int scoringScale;

    @Column(name = "MinAvgMarkToPass")
    private int markMin;

    @Column(name = "ApprovedDate")
    private Date approvedDate;

    @Column(name = "slot")
    private int slot;

    @Column(name = "SubjectId")
    private int subjectId;

    @Column(name = "isActive")
    private boolean isActive;
}
