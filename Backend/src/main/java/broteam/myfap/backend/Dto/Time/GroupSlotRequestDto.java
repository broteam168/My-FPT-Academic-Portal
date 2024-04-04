package broteam.myfap.backend.Dto.Time;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupSlotRequestDto {

    private String Name;
     private String Description;

    private boolean IsActive;

    private String Type;
}
