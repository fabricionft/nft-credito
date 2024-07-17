package nftcredito.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginAdminRequestDTO {

    private String email;
    private String senha;
    private String senhaLoginSistema;
}
