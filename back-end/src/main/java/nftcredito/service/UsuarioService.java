package nftcredito.service;

import nftcredito.dto.request.*;
import nftcredito.dto.response.LoginAdminResponseDTO;
import nftcredito.dto.response.LoginResponseDTO;
import nftcredito.exception.RequestException;
import nftcredito.model.ConfirmacaoModel;
import nftcredito.model.UsuarioModel;
import nftcredito.repository.ConfirmacaoRepository;
import nftcredito.repository.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ConfirmacaoRepository confirmacaoRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${senha.sistema}")
    private String senhaSistema;

    @Value("${senha.login.admin}")
    private String senhaLoginAdmin;

    @Autowired
    private TokenService tokenService;


    public List<UsuarioModel> listarUsuarios(){
        return usuarioRepository.findAll();
    }

    public UsuarioModel buscarUsuarioPorCodigo(Long codigo){
        return usuarioRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Usuário inexistente"));
    }

    public UsuarioModel buscarUsuarioPorEmail(String email){
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RequestException("Desculpe, não existe nenhuma conta com este email!"));
    }

    public UsuarioModel salvarUsuario(CadastroRequestDTO cadastroRequest) {
        if (usuarioRepository.findByEmail(cadastroRequest.getEmail()).isPresent())
            throw new RequestException("Desculpe, este usuário já esta sendo utilizado, por favor defina outro!");

        Integer codigoConfirmacao = buscarConfirmacaoPorEmail(cadastroRequest.getEmail()).getCodigoConfirmacao();
        if(codigoConfirmacao.equals(cadastroRequest.getCodigoConfirmacao())){
            UsuarioModel usuario = modelMapper.map(cadastroRequest, UsuarioModel.class);

            LocalDateTime data = LocalDateTime.ofInstant(Instant.now(), ZoneId.of("America/Sao_Paulo"));
            DateTimeFormatter formatar = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
            usuario.setDataCadastro(formatar.format(data));
            usuario.setRole("ROLE_USER");
            usuario.setSenha(passwordEncoder.encode(cadastroRequest.getSenha()));

            return usuarioRepository.save(usuario);
        }else throw new RequestException("Desculpe, o código de confirmação está incorreto!");
    }

    public LoginResponseDTO fazerLogin(LoginRequestDTO loginRequest){
        UsuarioModel usuario = buscarUsuarioPorEmail(loginRequest.getEmail());

        if(passwordEncoder.matches(loginRequest.getSenha(), usuario.getSenha())){
            return new LoginResponseDTO(
                usuario.getCodigo(),
                usuario.getRole()
            );
        }else throw new RequestException("Senha incorreta!");
    }

    public LoginAdminResponseDTO fazerLoginComoAdmin(LoginAdminRequestDTO loginAdminRequest){
        UsuarioModel usuario = buscarUsuarioPorEmail(loginAdminRequest.getEmail());

        if(passwordEncoder.matches(loginAdminRequest.getSenha(), usuario.getSenha())){
            if(passwordEncoder.matches(loginAdminRequest.getSenhaLoginSistema(), senhaLoginAdmin)){
                if(usuario.getRole().equals("ROLE_ADMIN")){
                    return new LoginAdminResponseDTO(
                            usuario.getRole(),
                            tokenService.gerarToken(usuario.getEmail())
                    );
                }else throw  new RequestException("Desculpe, este usuário não possui papel de administrador!!");
            }else throw  new RequestException("Senha de login ADMIn incorreta!");
        }else throw new RequestException("Senha incorreta!");
    }

    public UsuarioModel atualizarUsuario(AtualizarCadastroRequestDTO atualizarCadastroRequest){
        UsuarioModel usuario = buscarUsuarioPorCodigo(atualizarCadastroRequest.getCodigo());

        usuario.setNomeCompleto(atualizarCadastroRequest.getNomeCompleto());
        usuario.setAutonomo((atualizarCadastroRequest.getAutonomo()));
        usuario.setNomeImobiliaria(atualizarCadastroRequest.getNomeImobiliaria());
        usuario.setCreci(atualizarCadastroRequest.getCreci());

        return usuarioRepository.save(usuario);
    }

    public String recuperarSenha(RecuperarSenhaRequestDTO recuperarSenhaRequest){
        UsuarioModel usuario = buscarUsuarioPorEmail(recuperarSenhaRequest.getEmail());
        Integer codigoConfirmacao = buscarConfirmacaoPorEmail(usuario.getEmail()).getCodigoConfirmacao();

        if(codigoConfirmacao.equals(recuperarSenhaRequest.getCodigoConfirmacao())){
            usuario.setSenha(passwordEncoder.encode(recuperarSenhaRequest.getNovaSenha()));
            usuarioRepository.save(usuario);
            return "Senha alterada com sucesso!";
        }else throw  new RequestException("Desculpe, o código de confirmação está incorreto!");
    }

    public String alterarSenha(AlterarSenhaRequestDTO alterarSenhaRequest){
        UsuarioModel usuario = buscarUsuarioPorCodigo(alterarSenhaRequest.getCodigo());

        if(passwordEncoder.matches(alterarSenhaRequest.getSenha(), usuario.getSenha())){
            usuario.setSenha(passwordEncoder.encode(alterarSenhaRequest.getNovaSenha()));
            usuarioRepository.save(usuario);
            return "Senha alterada com sucesso!";
        }
        else throw new RequestException("Senha atual incorreta");
    }

    public UsuarioModel alterarRole(Long codigo, String senha){
        UsuarioModel usuario = buscarUsuarioPorCodigo(codigo);

        if(passwordEncoder.matches(senha, senhaSistema)){
            usuario.setRole((usuario.getRole().equals("ROLE_USER") ? "ROLE_ADMIN" : "ROLE_USER"));
            return  usuarioRepository.save(usuario);
        }
        else throw new RequestException("Senha do sistema incorreta!");
    }

    public String excluirUsuarios(){
        usuarioRepository.deleteAll();
        return "Usuários excluidos com sucesso!";
    }


    //Metódos privados
    private ConfirmacaoModel buscarConfirmacaoPorEmail(String email){
        return confirmacaoRepository.findByEmail(email)
               .orElseThrow(() -> new RequestException("Você ainda não gerou seu código de confirmação!"));
    }
}
