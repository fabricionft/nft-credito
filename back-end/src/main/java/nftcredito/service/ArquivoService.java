package nftcredito.service;

import nftcredito.exception.RequestException;
import nftcredito.model.ArquivoModel;
import nftcredito.model.ClienteModel;
import nftcredito.repository.ArquivoRepository;
import nftcredito.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ArquivoService {

    @Autowired
    private ArquivoRepository arquivoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private DiaAcaoService acaoService;


    public List<ArquivoModel> listarArquivosDeumUsuarioPorCodigo(Long codigo){
        return arquivoRepository.listarArquivosDeUmClientePorCodigo(codigo);
    }

    public ArquivoModel buscarArquivoPorCodigo(Long codigo){
        return arquivoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Arquivo inexistente!"));
    }

    public ArquivoModel salvarArquivo(Long codigoCliente, MultipartFile arquivoBruto){
        String extensao = arquivoBruto.getOriginalFilename().substring(arquivoBruto.getOriginalFilename().lastIndexOf(".") + 1);

        ArquivoModel arquivo = null;
        try {
            arquivo = new ArquivoModel(
              null,
              arquivoBruto.getOriginalFilename(),
              extensao,
              arquivoBruto.getBytes()
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        ClienteModel cliente = buscarClientePorCodigo(codigoCliente);

        cliente.getArquivos().add(arquivo);
        cliente.getHistoricoDias().add(
            acaoService.adcionarAcaoEmUmDiaDoHistorico("adcionarArquivo", cliente, arquivo.getNomeArquivo())
        );

        clienteRepository.save(cliente);

        return arquivo;
    }

    public String excluirArquivoPorCodigo(Long codigo){
        ArquivoModel arquivo = buscarArquivoPorCodigo(codigo);
        ClienteModel cliente = buscarClientePorCodigoDeArquivo(codigo);

        cliente.getHistoricoDias().add(
            acaoService.adcionarAcaoEmUmDiaDoHistorico("excluirArquivo", cliente, arquivo.getNomeArquivo())
        );

        arquivoRepository.delete(buscarArquivoPorCodigo(codigo));
        return "Arquivo excluído com sucesso!";
    }


    //Metódos privados
    public ClienteModel buscarClientePorCodigo(Long codigo){
        return clienteRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Cliente inexistente!"));
    }

    public ClienteModel buscarClientePorCodigoDeArquivo(Long codigo){
        return clienteRepository.buscarClientePorCodigoDeArquivo(codigo)
                .orElseThrow(() -> new RequestException("Cliente inexistente!"));
    }
}
