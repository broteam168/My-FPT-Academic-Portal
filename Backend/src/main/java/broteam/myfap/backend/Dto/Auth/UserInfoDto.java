package broteam.myfap.backend.Dto.Auth;

import broteam.myfap.backend.Models.Role;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;



    @Getter
    @Setter
    public class UserInfoDto {

        private int UserId;
        private String UserName;
        private String Phone;
        private String Mail;
        private String Address;
        private Date LastLogin;
        private List<Role> roles;
        private String FullName;
}
