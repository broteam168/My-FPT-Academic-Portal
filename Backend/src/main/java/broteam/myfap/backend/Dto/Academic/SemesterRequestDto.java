package broteam.myfap.backend.Dto.Academic;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter

public class SemesterRequestDto {
    private String Name;
    private int Year;
    private int Order;
    @JsonProperty("startDate")
    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+7")
    private Date StartDate;
    @JsonProperty("endDate")
    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+7")
    private Date EndDate;
    private String Description;
    private boolean IsActive;
}
