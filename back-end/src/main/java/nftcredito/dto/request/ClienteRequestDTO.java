package nftcredito.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ClienteRequestDTO {

    private String nome;
    private MultipartFile arquivo;
}
