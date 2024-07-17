package nftcredito.repository;

import nftcredito.model.DiaAcaoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiaAcaoRepository extends JpaRepository<DiaAcaoModel, Long> {

    @Query(value = "select c.historicoDias from Cliente c inner join c.historicoDias d where c.codigo = :codigo and d.dia = :dia")
    Optional<DiaAcaoModel> buscaeDiaEmHistoricoDeUmCliente(Long codigo, String dia);
}
