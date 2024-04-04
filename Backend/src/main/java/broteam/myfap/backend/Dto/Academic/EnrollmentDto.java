package broteam.myfap.backend.Dto.Academic;

import broteam.myfap.backend.Models.Academic.Student;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentDto {
    private int id;
    private int studentId;
    private int courseId;
    private String type;
    private boolean status;
    private String quality;
    private String note;

    @JsonProperty("createAt" )
    @JsonFormat(pattern = "dd/MM/yyyy" , timezone = "GMT+7")
    private Date createAt;
}
