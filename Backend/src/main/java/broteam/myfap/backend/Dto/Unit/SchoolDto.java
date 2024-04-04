package broteam.myfap.backend.Dto.Unit;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SchoolDto {
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

}
