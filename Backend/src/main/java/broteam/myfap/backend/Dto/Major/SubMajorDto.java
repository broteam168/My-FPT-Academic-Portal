package broteam.myfap.backend.Dto.Major;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubMajorDto {
    private int id;
    private String Name;
    private String FullName;
    private int MajorId;
    private String Type;
    private boolean IsCommon;
    private String Description;
    private boolean IsActive;
}
