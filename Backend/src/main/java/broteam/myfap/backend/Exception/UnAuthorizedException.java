package broteam.myfap.backend.Exception;

public class UnAuthorizedException extends RuntimeException {
    public UnAuthorizedException() {
        super("Unauthorized");
    }
}
