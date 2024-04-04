package broteam.myfap.backend.Models;

import broteam.myfap.backend.Models.Enums.RoleType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
@Table(name = "S_Role")
public class Role  extends BaseEntity{

    @Enumerated(EnumType.STRING)
    private RoleType name;

    @ManyToMany(mappedBy = "roles")
    @JsonBackReference
    private List<User> userEntities;
}