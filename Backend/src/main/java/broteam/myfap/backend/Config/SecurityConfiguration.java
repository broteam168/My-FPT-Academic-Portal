package broteam.myfap.backend.Config;

import broteam.myfap.backend.Models.Enums.RoleType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/login").permitAll()
                        .requestMatchers("/api/v1/auth/verify-role").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name(), RoleType.TEACHER.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/unit/school").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/unit/school/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/unit/school").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/unit/school/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/unit/school/*").hasAnyAuthority(RoleType.ADMIN.name())


                        .requestMatchers(HttpMethod.GET, "/api/v1/unit/class").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/unit/class").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/unit/class").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/unit/class/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/unit/class/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/unit/class/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/unit/room").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/unit/room/search").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/unit/room").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/unit/room/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/unit/room/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/unit/room/*").hasAnyAuthority(RoleType.ADMIN.name())


                        .requestMatchers(HttpMethod.GET, "/api/v1/unit/class/search").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/major").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/major/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/major").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/major/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/major/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/submajor").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/submajor").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/submajor/search").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/submajor/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/submajor/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/submajor/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/time/groupslot").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/time/groupslot").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/time/groupslot/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/time/groupslot/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/time/groupslot/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/time/slot").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/time/slot/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/time/slot/search").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/time/slot").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/time/slot/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/time/slot/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/subject").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/subject/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/subject/search").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/academic/subject").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/academic/subject/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/academic/subject/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/syllabus").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/syllabus/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/syllabus/search").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/academic/syllabus").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/academic/syllabus/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/academic/syllabus/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/curiculum").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/curiculum/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/academic/curiculum").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/academic/curiculum/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/academic/curiculum/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/semester").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/academic/semester").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/semester/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/academic/semester/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/academic/semester/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/course").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/academic/course").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/course/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/academic/course/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/academic/course/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/time/session").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/time/session/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/time/session").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/subject").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/subject/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/subject/search").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/academic/subject").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/academic/subject/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/academic/subject/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/syllabus").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/syllabus/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/syllabus/search").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/academic/syllabus").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/academic/syllabus/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/academic/syllabus/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/curiculum").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/curiculum/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/academic/curiculum").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/academic/curiculum/*").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/v1/academic/curiculum/*").hasAnyAuthority(RoleType.ADMIN.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/enrollment").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/enrollment/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.POST, "/api/v1/academic/enrollment").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())

                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/student").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())
                        .requestMatchers(HttpMethod.GET, "/api/v1/academic/student/*").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())

                        .requestMatchers("/admin/auth").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.STUDENT.name())


                ).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
