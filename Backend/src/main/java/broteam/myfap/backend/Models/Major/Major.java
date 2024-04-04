package broteam.myfap.backend.Models.Major;

import broteam.myfap.backend.Models.Enums.MajorCategory;
import broteam.myfap.backend.Models.Unit.Class;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "M_Major")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Major {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String Name;

    @Enumerated(EnumType.STRING)
    @Column(name = "Category")
    private MajorCategory Category;

    @Column(name = "DegreeLevel")
    private String DegreeLevel;

    @Column(name = "FullName")
    private String FullName;

    @Column(name = "Description")
    private String Description;

    @Column(name = "IsActive")
    private boolean IsActive;


}
