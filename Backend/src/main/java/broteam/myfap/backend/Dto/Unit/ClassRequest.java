package broteam.myfap.backend.Dto.Unit;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ClassRequest {
    private int id;
    @NotEmpty
    private String Name;

    private int majorId;
    @NotEmpty
    private String Description;
    private int school;
    private boolean IsActive;

}
