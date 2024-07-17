package nftcredito.service;

import nftcredito.exception.RequestException;
import nftcredito.model.ArquivoModel;
import nftcredito.model.ClienteModel;
import nftcredito.model.DiaAcaoModel;
import nftcredito.model.UsuarioModel;
import nftcredito.repository.ClienteRepository;
import nftcredito.repository.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ClienteService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private DiaAcaoService acaoService;

    @Autowired
    private ModelMapper modelMapper;


    public ClienteModel buscarClientePorCodigo(Long codigo){
        return clienteRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Cliente inexistente!"));
    }

    public ClienteModel buscarClienteDeUmUsuario(Long codigoUsuario, Long codigoCliente){
        UsuarioModel usuario = buscarUsuarioPorCodigo(codigoUsuario);
        ClienteModel cliente = buscarClientePorCodigo(codigoCliente);

        return  clienteRepository.buscarClienteDeUmUsuario(usuario.getCodigo(), cliente.getCodigo())
                .orElseThrow(() -> new RequestException("Desculpe, este cliente não te pertence, portanto você não pode acessar ou editar suas informações!"));
    }

    public List<ClienteModel> listarClientesDeUmUsuario(Long codigo){
        return clienteRepository.listarClientesDeUmUsuarioPorCodigo(codigo);
    }

    public List<DiaAcaoModel> buscarHistoricoDeAcoesPorCodigoDeCliente(Long codigo){
        return clienteRepository.buscarHistoricoDeAcoesPorCodigoDeCliente(codigo);
    }

    public ClienteModel adcionarCliente(Long codigoUsuario, ClienteModel cliente){
        UsuarioModel usuario = buscarUsuarioPorCodigo(codigoUsuario);

        LocalDateTime data = LocalDateTime.ofInstant(Instant.now(), ZoneId.of("America/Sao_Paulo"));
        DateTimeFormatter formatar = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        cliente.setDataCadastro(formatar.format(data));

        cliente.getHistoricoDias().add(
            acaoService.adcionarAcaoEmUmDiaDoHistorico("cadastrar", null, null)
        );

        usuario.getClientes().add(cliente);

        usuarioRepository.save(usuario);
        return cliente;
    }

    public ClienteModel atualizarCliente(ClienteModel clienteAtualizado){
        List<ArquivoModel> arquivosClienteAtual = buscarClientePorCodigo(clienteAtualizado.getCodigo()).getArquivos();
        List<DiaAcaoModel> historicoDias = buscarClientePorCodigo(clienteAtualizado.getCodigo()).getHistoricoDias();

        historicoDias.add(
            acaoService.adcionarAcaoEmUmDiaDoHistorico("atualizar", clienteAtualizado, null)
        );

        clienteAtualizado.setHistoricoDias(historicoDias);
        clienteAtualizado.setArquivos(arquivosClienteAtual);

        return clienteRepository.save(clienteAtualizado);
    }

    public String excluirCliente(Long codigo){
        clienteRepository.delete(buscarClientePorCodigo(codigo));
        return "Cliente excluído com sucesso";
    }


    //Métodos privados
    private UsuarioModel buscarUsuarioPorCodigo(Long codigo){
        return usuarioRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("Usuário inexistente"));
    }
}
