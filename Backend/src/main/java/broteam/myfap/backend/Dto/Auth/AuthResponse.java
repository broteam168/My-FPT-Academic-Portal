package broteam.myfap.backend.Dto.Auth;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AuthResponse {

    private String AccessToken;

    private UserInfoDto  userInfoDto;
}
