package broteam.myfap.backend.Models.Academic;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "A_Semester")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Semester {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;

    @Column(name = "Name")
    private String Name;

    @Column(name = "Year")
    private int Year;

    @Column(name = "\"Order\"")
    private int Order;

    @Column(name = "StartDate")
    private Date StartDate;

    @Column(name = "EndDate")
    private Date EndDate;

    @Column(name = "Description")
    private String Description;

    @Column(name = "IsActive")
    private boolean IsActive;


}
