package nftcredito.controller;

import nftcredito.service.ConfirmacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/confirmacao")
public class ConfirmacaoController {

    @Autowired
    private ConfirmacaoService confirmacaoService;


    @PostMapping
    public ResponseEntity<?> solicitarCodigoDeConfirmacao(@RequestParam String email){
        return new ResponseEntity<>(confirmacaoService.solicitarCodigoDeConfirmacao(email), HttpStatus.CREATED);
    }
}
