package nftcredito.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CadastroRequestDTO {

    private Integer codigoConfirmacao;
    private String nomeCompleto;
    private String autonomo;
    private String nomeImobiliaria;
    private String creci;
    private String email;
    private String senha;
}
