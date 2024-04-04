package broteam.myfap.backend;

import broteam.myfap.backend.Models.Role;
import broteam.myfap.backend.Models.User;
import broteam.myfap.backend.Repository.UserRepository;
import org.hibernate.query.sqm.CastType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;

import javax.naming.Context;
import java.util.stream.Stream;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class BackEndApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(BackEndApplication.class, args);

    }

}
