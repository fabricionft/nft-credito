//Hooks
import useMessageBox from "./useMessageBox";

//Utils
import verificarSeOtextoPossuiSomenteNumeros from "../utils/verificarSeOtextoPossuiSomenteNumeros";


const useValidacoes = () => {

  const {exibirMessageBox} = useMessageBox();

  const emitirErrogenerico = (msg) => {
    exibirMessageBox(
      false,
      "",
      (msg) ? msg : "Preencha todos os campos deste formulário!"
    );
  }

  const validarEtapa1FormularioCadastro = (usuario) => {
    if(usuario.nomeCompleto && usuario.autonomo && usuario.autonomo != "escolha" && usuario.creci){
      let erros = [];

      if(usuario.nomeCompleto.trim().split(" ").length < 2) erros.push("Por favor digite seu nome completo!");
      if(usuario.autonomo == "nao" && !usuario.nomeImobiliaria) erros.push("Por favor digite o nome da imobiliária!");
      if(verificarSeOtextoPossuiSomenteNumeros(usuario.creci)) erros.push("Seu CRECI deve possuir apenas números!");
      if(usuario.creci.length < 9) erros.push("Digite o CRECI completo!");

      if(!erros.length) return true;
      else{
        exibirMessageBox(
          false,
          "",
          erros
        );
      }
    }else emitirErrogenerico();
  }

  const validarEtapa2FormularioCadastro = (usuario) => {
    if(usuario.email && usuario.senha && usuario.confirmacaoSenha){
      let erros = [];

      if(!usuario.email.endsWith("@gmail.com")) erros.push("Seu email precisa do prefixo @gmail.com!");
      if(usuario.senha.length < 8) erros.push("Sua senha deve ter ao menos 8 digítos!");
      if(usuario.senha != usuario.confirmacaoSenha) erros.push("A senha e sua confirmação devem ser iguais");

      if(!erros.length) return true;
      else{
        exibirMessageBox(
          false,
          "",
          erros
        );
      }
    }else emitirErrogenerico("Preencha todos os campos deste formulário!");
  }

  const validarFormularioRecuperarSenha = (usuario) => {
    if(usuario.email && usuario.codigoConfirmacao && usuario.novaSenha && usuario.confirmacaoNovaSenha){
      let erros = [];

      if(usuario.novaSenha.length < 8) erros.push("Sua nova senha deve ter ao menos 8 digítos!");
      else if(usuario.novaSenha != usuario.confirmacaoNovaSenha) erros.push("A nova senha e sua confirmação devem ser iguais!");
      
      if(!erros.length) return true;
      else{
        exibirMessageBox(
          false,
          "",
          erros
        );
      }
    }else emitirErrogenerico();
  }

  const validarFormularioTrocarSenha = (usuario) => {
    if(usuario.senha && usuario.novaSenha && usuario.confirmacaoNovaSenha){
      let erros = [];

      if(usuario.novaSenha.length < 8) erros.push("Sua nova senha deve ter ao menos 8 digítos!");
      else if(usuario.novaSenha != usuario.confirmacaoNovaSenha) erros.push("A nova senha e sua confirmação devem ser iguais!");
      if(usuario.senha == usuario.novaSenha) erros.push("Sua nova senha não pode ser igual a atual!");

      if(!erros.length) return true;
      else{
        exibirMessageBox(
          false,
          "",
          erros
        );
      }
    }else emitirErrogenerico();
  }

  const validarFormularioLCliente = (cliente) => {
    if(cliente.nome && cliente.cpf && cliente.descricao &&
      cliente.mes && cliente.dia && cliente.ano &&
      cliente.mes != "escolha" && cliente.dia != "escolha" && cliente.ano != "escolha"){
      let erros = [];

      if(cliente.nome.trim().split(" ").length < 2) erros.push("Por favor digite o nome completo do cliente!");
      if(cliente.cpf.length < 11) erros.push("Digite o CPF completo!");
      else if(!validarCPF(cliente.cpf)) erros.push("Digite um CPF válido!");
      if(verificarSeOtextoPossuiSomenteNumeros(cliente.cpf)) erros.push("Seu CPF deve possuir apenas números!");

      
      if(!erros.length) return true;
      else{
        exibirMessageBox(
          false,
          "",
          erros
        );
      }
    }else emitirErrogenerico();
  }

  const validarFormularioArquivo = (arquivo) => {
    if(arquivo){
      let erros = [];

      if((arquivo.size/1000000).toFixed(2) > 1) erros.push("Desculpe, o tamanho máximo de um arquivo para upload é de 1MB!");
      if(!['png', 'jpg', 'jpeg', 'pdf', 'zip'].includes(arquivo.type.split("/")[1])) erros.push("Desculpe, o formato do arquivo é inválido! Você pode apenas fazer uploading de arquivos png, jpg, jpge, pdf er zip.");

      
      if(!erros.length) return true;
      else{
        exibirMessageBox(
          false,
          "",
          erros
        );
      }
    }else emitirErrogenerico("Por favor adcione um arquivo!");
  }

  const validarCPF = (cpf) => {
    const digitoJ = gerarDigitoVerificador(cpf, 10);
    const digitoK = gerarDigitoVerificador(cpf, 11);

    if(digitoJ == cpf.substring(9, 10) && digitoK == cpf.substring(10,11)) return true;
    else return false;
  }

  const gerarDigitoVerificador = (cpf, maximo) => {
    let somaDigitos = 0;
    let inicio = 0;
    let fim = 1;
    for(var i = maximo; i >= 2; i--){
        somaDigitos += cpf.substring(inicio, fim) * i;
        inicio++;
        fim++;
    }
    if((11 - (somaDigitos % 11)) >= 10) return 0;
    else return (11 - (somaDigitos % 11));
  }


  return{
    validarEtapa1FormularioCadastro, validarEtapa2FormularioCadastro,
    validarFormularioRecuperarSenha, validarFormularioTrocarSenha,
    validarFormularioLCliente, validarFormularioArquivo
  };
}

export default useValidacoes;