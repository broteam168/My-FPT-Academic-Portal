package broteam.myfap.backend.Dto.Academic;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
public class RequestCourseDto {
    private Integer Id;

    private String Name;

   private String Status;

    private String Slots;

    private String Days;

   private Integer ClassId;

    private Integer SubMajorId;

   private Integer RoomId;;

     private Integer SemesterId;

   private Integer SubjectId;

     private Integer TeacherId;
}
