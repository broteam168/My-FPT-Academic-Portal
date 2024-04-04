package broteam.myfap.backend.Dto.Academic;

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
public class StudentDto {
    private int id;
    private int userId;
    private int subMajorId;
    private int semester;
    private int schoolId;
    private int classId;
    private String studentCode;

    @JsonProperty("dob" )
    @JsonFormat(pattern = "yyyy-MM-dd" , timezone = "GMT+7")
    private Date dob;
}
