package broteam.myfap.backend.Dto.Auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import jakarta.validation.constraints.NotEmpty;

@AllArgsConstructor
@Getter
public class AuthRequest {

    @NotEmpty
    private String UserName;

    @NotEmpty
    private String UserPassword;
}
