package broteam.myfap.backend.Models.Time;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "T_Group_Slot")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String Name;

    @Column(name = "Description")
    private String Description;

    @Column(name = "IsActive")
    private boolean IsActive;

    @Column(name = "Type")
    private String Type;
}
