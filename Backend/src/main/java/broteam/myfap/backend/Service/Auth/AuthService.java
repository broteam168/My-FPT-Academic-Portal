package broteam.myfap.backend.Service.Auth;

import broteam.myfap.backend.Dto.Auth.AuthResponse;
import broteam.myfap.backend.Dto.Auth.UserInfoDto;
import broteam.myfap.backend.Dto.Auth.AuthRequest;
import broteam.myfap.backend.Exception.NotFoundException;
import broteam.myfap.backend.Models.User;
import broteam.myfap.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.modelmapper.ModelMapper;
@Service
public class AuthService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final AuthenticationManager authenticationManager;
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }
    public AuthResponse authenticate(AuthRequest authDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authDto.getUserName(),
                        authDto.getUserPassword()
                )
        );
        String token = jwtService.generateToken(authentication.getName());
        User userEntity = userRepository.findByUserName(authDto.getUserName())
                .orElseThrow(() -> new NotFoundException("profile not found"));
        ModelMapper modelMapper = new ModelMapper();
        return AuthResponse.builder()
                .userInfoDto(modelMapper.map(userEntity, UserInfoDto.class))
                .AccessToken(token)
                .build();
    }

    public boolean verify(String role)
    {
        UserDetails currentUser =(UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return currentUser.getAuthorities().stream().anyMatch(x -> x.toString().equals(role));
    }
}
