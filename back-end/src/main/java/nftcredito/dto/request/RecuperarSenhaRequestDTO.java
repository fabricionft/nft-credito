package nftcredito.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecuperarSenhaRequestDTO {

    private String email;
    private Integer codigoConfirmacao;
    private String novaSenha;
}
