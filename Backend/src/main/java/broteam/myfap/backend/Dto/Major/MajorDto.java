package broteam.myfap.backend.Dto.Major;

import broteam.myfap.backend.Models.Enums.MajorCategory;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MajorDto {

    private int id;


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
