package nftcredito.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Arquivo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "arquivos")
public class ArquivoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String nomeArquivo;

    private String extensao;

    @Lob
    @Column(columnDefinition="longblob")
    private byte[] bytes;
}
