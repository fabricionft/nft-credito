package nftcredito.repository;

import nftcredito.model.ArquivoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArquivoRepository extends JpaRepository<ArquivoModel, Long> {

    Optional<ArquivoModel> findByCodigo(Long codigo);

    @Query(value = "select c.arquivos from Cliente c inner join c.arquivos where c.codigo = :codigo")
    List<ArquivoModel> listarArquivosDeUmClientePorCodigo(Long codigo);

}
