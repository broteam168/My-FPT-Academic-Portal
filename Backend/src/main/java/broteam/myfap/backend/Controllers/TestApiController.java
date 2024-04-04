package broteam.myfap.backend.Controllers;

import broteam.myfap.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
    @RequestMapping("/admin/auth")
public class TestApiController {
    @Autowired
    public UserRepository userRepository;
    @GetMapping
    public Object getTest()
    {

        return userRepository.findByUserName("admin");
    }
}
