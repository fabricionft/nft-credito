package nftcredito.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "Acao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "acoes")
public class AcaoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String data;

    private String titulo;

    @Lob
    @Basic(fetch=FetchType.LAZY)
    @Column(columnDefinition = "blob")
    private List<String> detalhamento = new ArrayList<>();

    private String tipo;
}
