package nftcredito.controller;

import nftcredito.dto.response.ClienteListaResponseDTO;
import nftcredito.dto.response.ClienteResponseDTO;
import nftcredito.model.ClienteModel;
import nftcredito.model.DiaAcaoModel;
import nftcredito.service.ClienteService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping(path = "/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarClientePorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(converterEmResponseDTO(clienteService.buscarClientePorCodigo(codigo)), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigoUsuario}/{codigoCliente}")
    public ResponseEntity<?> buscarClienteDeUmUsuario(@PathVariable Long codigoUsuario,
                                                      @PathVariable Long codigoCliente){
        return new ResponseEntity<>(converterEmResponseDTO(clienteService.buscarClienteDeUmUsuario(codigoUsuario, codigoCliente)), HttpStatus.OK);
    }

    @GetMapping(path = "/clientesDeUmUsuario/{codigo}")
    public ResponseEntity<?> listarClientesDeUmUsuario(@PathVariable  Long codigo,
                                                       Pageable pageable){
        return new ResponseEntity<>(converterEmListaPaginadaDeResponseDTO(clienteService.listarClientesDeUmUsuario(codigo), pageable), HttpStatus.OK);
    }

    @GetMapping(path = "/historicoDeAcoes/{codigo}")
    public ResponseEntity<?> buscarHistoricoDeAcoesPorCodigoDeCliente(@PathVariable Long codigo,
                                                                      Pageable pageable){
        return new ResponseEntity<>(converterEmListaPaginada(clienteService.buscarHistoricoDeAcoesPorCodigoDeCliente(codigo), pageable), HttpStatus.OK);
    }

    @PostMapping(path = "/{codigo}")
    public ResponseEntity<?> adcionarCliente(@PathVariable  Long codigo,
                                             @RequestBody ClienteModel cliente){
        return new ResponseEntity<>(clienteService.adcionarCliente(codigo, cliente), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> atualizarCliente(@RequestBody ClienteModel cliente){
        return new ResponseEntity<>(clienteService.atualizarCliente(cliente), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{codigo}")
    public ResponseEntity<?> excluirCliente(@PathVariable  Long codigo){
        return new ResponseEntity<>(clienteService.excluirCliente(codigo), HttpStatus.OK);
    }


    //privados
    public Page<ClienteListaResponseDTO> converterEmListaPaginadaDeResponseDTO(List<ClienteModel> clientes, Pageable pageable){
        List<ClienteListaResponseDTO> clientesDTO = new ArrayList<>();

        for(ClienteModel cliente: clientes)
            clientesDTO.add(modelMapper.map(cliente, ClienteListaResponseDTO.class));

        int comeco = (int)pageable.getOffset();
        int fim = Math.min((comeco + pageable.getPageSize()), clientesDTO.size());

        if(comeco > fim){
            comeco = 0;
            fim = 0;
        }

        Page<ClienteListaResponseDTO> pageClientesResponseDTO
        = new PageImpl<>(
            clientesDTO.subList(comeco, fim),
            pageable,
            clientesDTO.size()
        );

        return pageClientesResponseDTO;
    }

    public Page<DiaAcaoModel> converterEmListaPaginada(List<DiaAcaoModel> historico, Pageable pageable){

        int comeco = (int)pageable.getOffset();
        int fim = Math.min((comeco + pageable.getPageSize()), historico.size());

        if(comeco > fim){
            comeco = 0;
            fim = 0;
        }

        Page<DiaAcaoModel> pageHistorico
            = new PageImpl<>(
            historico.subList(comeco, fim),
            pageable,
            historico.size()
        );

        return pageHistorico;
    }

    public ClienteResponseDTO converterEmResponseDTO(ClienteModel cliente){
        return  modelMapper.map(cliente, ClienteResponseDTO.class);
    }
}
