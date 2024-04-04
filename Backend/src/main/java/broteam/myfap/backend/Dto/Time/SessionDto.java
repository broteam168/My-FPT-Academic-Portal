package broteam.myfap.backend.Dto.Time;

import broteam.myfap.backend.Models.Academic.Course;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.util.Date;


@Getter
@Setter

public class SessionDto {
   private int id;
   private String Name;
    private Time StartTime;

   private Time EndTime;
   @JsonProperty("dateDay" )
   @JsonFormat(pattern = "dd/MM/yyyy" , timezone = "GMT+7")

   private Date DateDay;
   private int CourseId;
   private String Status;
   private Course course;
   private int Slot;
}
