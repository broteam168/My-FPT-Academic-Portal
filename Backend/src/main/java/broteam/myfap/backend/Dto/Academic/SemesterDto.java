package broteam.myfap.backend.Dto.Academic;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter

public class SemesterDto {
    private int id;
    private String Name;
    private int Year;
    private int Order;
    @JsonProperty("startDate" )
    @JsonFormat(pattern = "dd/MM/yyyy" , timezone = "GMT+7")
    private Date StartDate;
    @JsonProperty("endDate" )
    @JsonFormat(pattern = "dd/MM/yyyy" , timezone = "GMT+7")
    private Date EndDate;
    private String Description;
    private boolean IsActive;
}
