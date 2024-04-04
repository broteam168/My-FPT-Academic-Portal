package broteam.myfap.backend.Controllers.Authentication;

import broteam.myfap.backend.Dto.Auth.AuthRequest;
import broteam.myfap.backend.Dto.Auth.AuthResponse;
import broteam.myfap.backend.Dto.ResponseObject;
import broteam.myfap.backend.Service.Auth.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final AuthService authService;
    @PostMapping("login")
    public ResponseEntity<ResponseObject> login(@RequestBody @Valid AuthRequest authDto) {

        AuthResponse authResponse = authService.authenticate(authDto);
         return ResponseEntity.ok(ResponseObject.builder()
                .data(authResponse)
                .message("login successfully")
                .responseCode(HttpStatus.OK.value())
                .build());

    }

    @GetMapping("verify-role")
    public ResponseEntity<ResponseObject> verify(@RequestParam(value = "role", defaultValue = "") String role) {
        boolean isRole = authService.verify(role);
        if(!isRole)
            return ResponseEntity.ok(ResponseObject.builder()
                    .data(role)
                    .message("Verify failed")
                    .responseCode(HttpStatus.ACCEPTED.value())
                    .build());
        return ResponseEntity.ok(ResponseObject.builder()
                .data(role)
                .message("Verify success")
                .responseCode(HttpStatus.OK.value())
                .build());
    }





}

