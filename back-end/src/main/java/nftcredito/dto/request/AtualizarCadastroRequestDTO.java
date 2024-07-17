package nftcredito.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AtualizarCadastroRequestDTO {

    private Long codigo;
    private String nomeCompleto;
    private String autonomo;
    private String nomeImobiliaria;
    private String creci;
}
