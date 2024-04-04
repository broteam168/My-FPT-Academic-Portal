package broteam.myfap.backend.Dto.Unit;

import broteam.myfap.backend.Models.Unit.Class;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SchoolFullDto {
   private int id;
    @NotEmpty
    private String Name;
    @NotEmpty
    private String Description;
    @NotEmpty
    private String Location;
    @NotEmpty
   private String Phone;
    private boolean IsActive;

     private String Rule;
 @JsonIgnoreProperties({"major"})
 private List<Class> classes;
}
