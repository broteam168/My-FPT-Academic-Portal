package broteam.myfap.backend.Dto.Academic;

import broteam.myfap.backend.Models.Academic.Subject;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SyllabusDto {
    private int id;
    private String studentTasks;
    private String tools;
    private int scoringScale;
    private int markMin;

    @JsonProperty("approvedDate" )
    @JsonFormat(pattern = "yyyy-MM-dd" , timezone = "GMT+7")
    private Date approvedDate;

    private int slot;

    private int subjectId;
    private boolean isActive;
}
