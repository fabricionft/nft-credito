package nftcredito.service;

import nftcredito.exception.RequestException;
import nftcredito.model.ConfirmacaoModel;
import nftcredito.repository.ConfirmacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ConfirmacaoService {

    @Autowired
    private ConfirmacaoRepository confirmacaoRepository;

    @Autowired
    private JavaMailSender mailSender;


    public ConfirmacaoModel solicitarCodigoDeConfirmacao(String email) {
        Integer codigo = ((int)(Math.random() * 8999) + 1000);
        email = email.trim();

        if(enviarEmail(email, codigo)){
            if (confirmacaoRepository.findByEmail(email).isPresent()) {
                ConfirmacaoModel codigoConfirmacao = confirmacaoRepository.findByEmail(email).get();
                codigoConfirmacao.setCodigoConfirmacao(codigo);

                return confirmacaoRepository.save(codigoConfirmacao);
            }else{
                ConfirmacaoModel novoCodigoConfirmacao = new ConfirmacaoModel(
                    null,
                    email,
                    codigo
                );
                return confirmacaoRepository.save(novoCodigoConfirmacao);
            }
        }else throw new RequestException("Erro ao enviar o código de confirmação para seu email! Por favor digite um email válido!");
    }

    public Boolean enviarEmail(String email, Integer codigo){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Código de confirmação");
        message.setText("O seu código é: "+codigo);

        try {
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
