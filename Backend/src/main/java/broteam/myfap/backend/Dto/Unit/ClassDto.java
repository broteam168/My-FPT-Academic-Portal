package broteam.myfap.backend.Dto.Unit;

import broteam.myfap.backend.Models.Major.Major;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClassDto {
    private int id;
    private String Name;
    private Major major;
    private String Description;
    private int school;
    private boolean IsActive;
}
