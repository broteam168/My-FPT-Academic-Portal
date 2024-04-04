package broteam.myfap.backend.Dto.Major;

import broteam.myfap.backend.Models.Enums.MajorCategory;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubMajorRequestDto {
    @NotEmpty
    private String Name;
    @NotEmpty
    private String FullName;
    private int MajorId;

    private String Type;
    private boolean IsCommon;
    @NotEmpty
    private String Description;
    private boolean IsActive;
}
