package broteam.myfap.backend.Models.Time;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;

@Entity
@Table(name = "T_Slot")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String Name;

    @Column(name = "Description")
    private String Description;

    @Column(name = "StartTime")
    private String StartTime;

    @Column(name = "EndTime")
    private String EndTime;

    @Column(name = "\"Order\"")
    private int Order;

    @Column(name = "GroupId")
    private int GroupId;

    @Column(name = "IsActive")
    private boolean IsActive;
}
