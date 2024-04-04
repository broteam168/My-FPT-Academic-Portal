package broteam.myfap.backend.Dto.Major;

import broteam.myfap.backend.Models.Enums.MajorCategory;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MajorRequestDto {


    @NotEmpty
    private String Name;

    private MajorCategory Category;


    @NotEmpty
    private String DegreeLevel;


    @NotEmpty
    private String FullName;


    @NotEmpty
    private String Description;

    private boolean IsActive;
}
