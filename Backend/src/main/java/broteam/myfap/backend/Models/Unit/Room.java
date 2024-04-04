package broteam.myfap.backend.Models.Unit;

import broteam.myfap.backend.Models.Enums.BuildingName;
import broteam.myfap.backend.Models.Enums.RoomType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "U_Room")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String Name;

    @Column(name = "Description")
    private String Description;

    @Column(name = "Type")
    @Enumerated(EnumType.STRING)
    private RoomType Type;

    @Enumerated(EnumType.STRING)
    @Column(name = "Building")
    private BuildingName Building;

    @Column(name = "IsActive")
    private boolean IsActive;

    @Column(name = "SchoolId")
    private int SchoolId;
}
