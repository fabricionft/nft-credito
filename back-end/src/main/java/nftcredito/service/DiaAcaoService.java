package nftcredito.service;

import nftcredito.exception.RequestException;
import nftcredito.model.AcaoModel;
import nftcredito.model.ClienteModel;
import nftcredito.model.DiaAcaoModel;
import nftcredito.repository.ClienteRepository;
import nftcredito.repository.DiaAcaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class DiaAcaoService {

    @Autowired
    private DiaAcaoRepository diaAcaoRepository;

    @Autowired
    private ClienteRepository clienteRepository;


    public DiaAcaoModel adcionarAcaoEmUmDiaDoHistorico(String tipo,
                                                       ClienteModel clienteAtualizado,
                                                       String nomeArquivo){
        LocalDateTime data = LocalDateTime.ofInstant(Instant.now(), ZoneId.of("America/Sao_Paulo"));
        DateTimeFormatter formatarDia = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter formatarHorario = DateTimeFormatter.ofPattern("HH:mm:ss");

        String dia = formatarDia.format(data);
        String horario =  formatarHorario.format(data);

        Long codigoClienteAtual = (clienteAtualizado == null) ? null : clienteAtualizado.getCodigo();
        Optional<DiaAcaoModel> buscarDia = diaAcaoRepository.buscaeDiaEmHistoricoDeUmCliente(codigoClienteAtual, dia);

        DiaAcaoModel diaAcao  = (buscarDia.isPresent()) ? buscarDia.orElseThrow(() -> new RequestException("Dia inexistente"))
        : new DiaAcaoModel(
            null,
            dia,
            new ArrayList<>()
        );

        AcaoModel acao = new AcaoModel(
            null,
            horario,
            "Cliente adcionado",
            new ArrayList<>(),
            tipo
        );

        if(tipo.equals("atualizar")){
            ClienteModel clienteAtual = buscarCLientePorCodigo(codigoClienteAtual);

            if(!clienteAtual.getNome().equals(clienteAtualizado.getNome()))
                acao.getDetalhamento().add("Nome: "+clienteAtual.getNome() +" -> "+ clienteAtualizado.getNome());

            if(!clienteAtual.getCpf().equals(clienteAtualizado.getCpf()))
                acao.getDetalhamento().add("CPF: "+clienteAtual.getCpf() +" -> "+ clienteAtualizado.getCpf());

            if(!clienteAtual.getDataNascimento().equals(clienteAtualizado.getDataNascimento()))
                acao.getDetalhamento().add("Data de nascimento: "+clienteAtual.getDataNascimento() +" -> "+ clienteAtualizado.getDataNascimento());

            if(!clienteAtual.getDescricao().equals(clienteAtualizado.getDescricao()))
                acao.getDetalhamento().add("Descrição: "+clienteAtual.getDescricao() +" -> "+ clienteAtualizado.getDescricao());

            if(acao.getDetalhamento().size() == 0)
                throw  new RequestException("Por favor edite algum dado para concluir esta ação!");

            acao.setTitulo("Cliente atualizado");
        }
        else if(tipo.equals("adcionarArquivo")){
            acao.getDetalhamento().add("O arquivo "+nomeArquivo+" foi adcionado!");
            acao.setTitulo("Arquivo adcionado");
        }
        else if(tipo.equals("excluirArquivo")){
            acao.getDetalhamento().add("O arquivo "+nomeArquivo+" foi excluído!");
            acao.setTitulo("Arquivo removido");
        }

        diaAcao.getAcoesDoDia().add(acao);

        return diaAcao;
    }


    //Métodos privados
    private  ClienteModel buscarCLientePorCodigo(Long codigo){
        return clienteRepository.findByCodigo(codigo)
               .orElseThrow(() -> new RequestException("usuário inexistente"));
    }
}
