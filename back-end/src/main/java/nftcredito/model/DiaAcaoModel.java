package nftcredito.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "DiaAcao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "diasAcoes")
public class DiaAcaoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String dia;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "acoesDoDia_id")
    private List<AcaoModel> acoesDoDia = new ArrayList<>();
}
