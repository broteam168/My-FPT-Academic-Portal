package broteam.myfap.backend.Models.Unit;

import broteam.myfap.backend.Models.Major.Major;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "U_Class")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String Name;

    @ManyToOne
    @JoinColumn(name = "MajorId", insertable = false, updatable = false)
    private Major major;

    @Column(name = "MajorId")
    private int majorId;

    @Column(name = "Description")
    private String Description;

    @Column(name = "SchoolId")
    private int school;

    @Column(name = "IsActive")
    private boolean IsActive;

}
