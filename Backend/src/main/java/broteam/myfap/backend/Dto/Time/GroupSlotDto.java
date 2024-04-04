package broteam.myfap.backend.Dto.Time;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupSlotDto {
    private int id;
    private String Name;
     private String Description;

    private boolean IsActive;

    private String Type;
}
