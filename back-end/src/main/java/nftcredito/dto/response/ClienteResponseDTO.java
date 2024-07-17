package nftcredito.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteResponseDTO {

    private Long codigo;
    private String dataCadastro;
    private String nome;
    private String cpf;
    private String dia;
    private String mes;
    private String ano;
    private String dataNascimento;
    private String descricao;
}
