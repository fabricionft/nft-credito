package nftcredito.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Confirmacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "confirmacoes")
public class ConfirmacaoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String email;
    private Integer codigoConfirmacao;
}
