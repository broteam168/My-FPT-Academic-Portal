package broteam.myfap.backend.Dto.Unit;

import broteam.myfap.backend.Models.Enums.BuildingName;
import broteam.myfap.backend.Models.Enums.RoomType;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoomRequestDto {
    @NotEmpty
    private String Name;
    @NotEmpty

    private String Description;

    private RoomType Type;

    private BuildingName Building;
    private int SchoolId;
    private boolean IsActive;
}
