package nftcredito.controller;

import nftcredito.dto.response.ArquivoResponseDTO;
import nftcredito.model.ArquivoModel;
import nftcredito.service.ArquivoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/arquivo")
public class ArquivoController {

    @Autowired
    private ArquivoService arquivoService;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping(path = "/arquivosDeUmCliente/{codigo}")
    public ResponseEntity<?> listarArquivosDeUmClientePorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(converterEmListaDeResponseDTO(arquivoService.listarArquivosDeumUsuarioPorCodigo(codigo)), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    public ResponseEntity<?> buscarArquivoPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(arquivoService.buscarArquivoPorCodigo(codigo), HttpStatus.OK);
    }

    @PostMapping(path = "/{codigoCliente}")
    public ResponseEntity<?> salvarArquivo(@PathVariable Long codigoCliente,
                                           @RequestBody MultipartFile arquivoBruto){
        return new ResponseEntity<>(arquivoService.salvarArquivo(codigoCliente, arquivoBruto), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{codigo}")
    public ResponseEntity<?> excluirArquivo(@PathVariable Long codigo){
        return new ResponseEntity<>(arquivoService.excluirArquivoPorCodigo(codigo), HttpStatus.OK);
    }


    //Metódos privados
    public List<ArquivoResponseDTO> converterEmListaDeResponseDTO(List<ArquivoModel> arquivos){
        List<ArquivoResponseDTO> arquivosDTO = new ArrayList<>();

        for(ArquivoModel arquivo: arquivos)
            arquivosDTO.add(converterEmResponseDTO(arquivo));

        return  arquivosDTO;
    }

    public ArquivoResponseDTO converterEmResponseDTO(ArquivoModel arquivo){
        return modelMapper.map(arquivo, ArquivoResponseDTO.class);
    }
}
