package nftcredito.controller;

import nftcredito.dto.request.*;
import nftcredito.dto.response.UsuarioResponseDTO;
import nftcredito.model.UsuarioModel;
import nftcredito.service.UsuarioService;
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
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listarUIsuarios(Pageable pageable){
        return new ResponseEntity<>(converterEmListaPaginadaDeResponseDTO(usuarioService.listarUsuarios(), pageable), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    public ResponseEntity<?> buscarUsuarioPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(converterEmResponseDTO(usuarioService.buscarUsuarioPorCodigo(codigo)), HttpStatus.OK);
    }

    @GetMapping(path = "/email/{email}")
    public ResponseEntity<?> buscarUsuarioPorEmail(@PathVariable String email){
        return new ResponseEntity<>(converterEmResponseDTO(usuarioService.buscarUsuarioPorEmail(email)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> salvarUsuario(@RequestBody CadastroRequestDTO cadastroRequest){
        return new ResponseEntity<>(converterEmResponseDTO(usuarioService.salvarUsuario(cadastroRequest)), HttpStatus.CREATED);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> fazerLogin(@RequestBody LoginRequestDTO loginRequest){
        return new ResponseEntity<>(usuarioService.fazerLogin(loginRequest), HttpStatus.OK);
    }

    @PostMapping(path = "/loginAdmin")
    public ResponseEntity<?> fazerLoginComoAdmin(@RequestBody LoginAdminRequestDTO loginAdminRequest){
        return new ResponseEntity<>(usuarioService.fazerLoginComoAdmin(loginAdminRequest), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> atualizarUsuario(@RequestBody AtualizarCadastroRequestDTO atualizarCadastroRequest) {
        return new ResponseEntity<>(converterEmResponseDTO(usuarioService.atualizarUsuario(atualizarCadastroRequest)), HttpStatus.CREATED);
    }

    @PutMapping(path = "/recuperarSenha")
    public ResponseEntity<?> recuperarSenha(@RequestBody RecuperarSenhaRequestDTO recuperarSenhaRequest) {
        return new ResponseEntity<>(usuarioService.recuperarSenha(recuperarSenhaRequest), HttpStatus.OK);
    }

    @PutMapping(path = "/alterarSenha")
    public ResponseEntity<?> alterarSenha(@RequestBody AlterarSenhaRequestDTO alterarSenhaRequest) {
        return new ResponseEntity<>(usuarioService.alterarSenha(alterarSenhaRequest), HttpStatus.OK);
    }

    @PutMapping(path = "/alterarRole/{codigo}/{senha}")
    public ResponseEntity<?> alterarRole(@PathVariable Long codigo,
                                         @PathVariable String senha) {
        return new ResponseEntity<>(usuarioService.alterarRole(codigo, senha), HttpStatus.OK);
    }


    //privados
    public Page<UsuarioResponseDTO> converterEmListaPaginadaDeResponseDTO(List<UsuarioModel> usuarios, Pageable pageable) {
        List<UsuarioResponseDTO> usuariosDTO = new ArrayList<>();

        for (UsuarioModel usuario : usuarios)
            usuariosDTO.add(converterEmResponseDTO(usuario));

        int comeco = (int) pageable.getOffset();
        int fim = Math.min((comeco + pageable.getPageSize()), usuarios.size());

        if(comeco > fim){
            comeco = 0;
            fim = 0;
        }


        Page<UsuarioResponseDTO> pageUsuariosResponseDTO
                = new PageImpl<>(
                usuariosDTO.subList(comeco, fim),
                pageable,
                usuariosDTO.size()
        );

        return pageUsuariosResponseDTO;
    }

    public UsuarioResponseDTO converterEmResponseDTO(UsuarioModel usuario){
        return modelMapper.map(usuario, UsuarioResponseDTO.class);
    }
}
