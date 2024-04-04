package broteam.myfap.backend.Models.Major;

import broteam.myfap.backend.Models.Academic.Curiculum;
import broteam.myfap.backend.Models.Enums.MajorCategory;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "M_SubMajor")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubMajor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String Name;

    @Column(name = "FullName")
    private String FullName;

    @Column(name = "MajorId")
    private int MajorId;

    @Column(name = "Type")
    private String Type;

    @Column(name = "IsCommon")
    private boolean IsCommon;

    @Column(name = "Description")
    private String Description;

    @Column(name = "IsActive")
    private boolean IsActive;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "SubMajorId", insertable = false, updatable = false)
    private List<Curiculum> curiculums;
}
