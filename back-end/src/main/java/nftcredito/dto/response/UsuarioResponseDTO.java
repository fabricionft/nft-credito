package nftcredito.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioResponseDTO {

    private Long codigo;
    private String dataCadastro;
    private String nomeCompleto;
    private String autonomo;
    private String nomeImobiliaria = null;
    private String creci;
    private String email;
    private String role;
}
