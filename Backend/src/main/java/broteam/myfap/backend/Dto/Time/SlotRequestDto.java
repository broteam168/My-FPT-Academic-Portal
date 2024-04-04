package broteam.myfap.backend.Dto.Time;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SlotRequestDto {
    private String Name;
    private String Description;
    private String StartTime;
    private String EndTime;
    private int Order;
    private int GroupId;
    private boolean IsActive;
}
