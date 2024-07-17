package nftcredito.repository;

import nftcredito.model.ClienteModel;
import nftcredito.model.DiaAcaoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteModel, Long> {

    Optional<ClienteModel> findByCodigo(Long codigo);

    @Query(value = "select u.clientes from Usuario u inner join u.clientes c where u.codigo = :codigo")
    List<ClienteModel> listarClientesDeUmUsuarioPorCodigo(Long codigo);

    @Query(value = "select u.clientes from Usuario u inner join u.clientes c where u.codigo =:codigoUsuario and c.codigo =:codigoCLiente")
    Optional<ClienteModel> buscarClienteDeUmUsuario(Long codigoUsuario, Long codigoCLiente);

    @Query(value = "select c from Cliente c inner join c.arquivos a where a.codigo = :codigo")
    Optional<ClienteModel> buscarClientePorCodigoDeArquivo(Long codigo);

    @Query(value = "select c.historicoDias from Cliente c inner join c.historicoDias where c.codigo = :codigo")
    List<DiaAcaoModel> buscarHistoricoDeAcoesPorCodigoDeCliente(Long codigo);
}
