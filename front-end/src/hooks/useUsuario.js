//Hooks
import { useEffect, useState } from "react";
import useSession from '../hooks/useSession';
import useMessageBox from "./useMessageBox";
import useValidacoes from "./useValidacoes";
import useTratarErro from "./useTratarErro";
import { useLocation, useParams } from "react-router-dom";
import useFormularios from "./useFormularios";
import useLoader from "./useLoader";

//Services
import api from '../services/api';


const useUSuario = () => {

  const {exibirMessageBox} = useMessageBox();
  const {tratarErro} = useTratarErro();
  const {esconderFormTrocarSenha} = useFormularios();
  const [usuario, setUSuario] = useState({});
  const {logar, codigo} = useSession();
  const location = useLocation();
  const {id} = useParams();
  const {exibirCardLoader} = useLoader();
  const {validarEtapa1FormularioCadastro, validarEtapa2FormularioCadastro,
         validarFormularioTrocarSenha, validarFormularioRecuperarSenha} = useValidacoes();


  const preencherUsuario = (e) => {
    setUSuario({...usuario, [e.target.name] : e.target.value});
  }

  const buscarUsuario = (codigo) => {
    api.get("/usuario/".concat(codigo))
    .then((resp) => {
      setUSuario(resp.data);
    })
    .catch((error) => {
      tratarErro("", error)
    });
  }

  useEffect(() => {
    if(["/perfil", "/adm/usuario/".concat(id)].includes(location.pathname)){
      buscarUsuario((id) ? id : codigo);
    }
  }, [])

  const fazerCadastro = () => {
    exibirCardLoader();
    if(validarEtapa2FormularioCadastro(usuario)){
      api.post("/usuario", {
        ...usuario,
        email: usuario.email.trim(),
        senha: usuario.senha.trim(),
      })
      .then(() => {
        fazerLogin(true);
      })
      .catch((error) => {
        tratarErro("", error);
      });
    }
  }

  const fazerLogin = (logarAposCadastro) => {
    exibirCardLoader();
    api.post("/usuario/login", {
      email: usuario.email.trim(),
      senha: usuario.senha.trim()
    })
    .then((resp) => {
      exibirMessageBox(
        true,
        "/",
        (logarAposCadastro) ? "Parabéns, sua conta foi criada com sucesso! Você já foi automaticamente logado."
                            : "Logado com sucesso!"
      );
      logar(resp.data);
    })
    .catch((error) => {
      tratarErro("", error);
    });
  }

  const atualizarCadastro = () => {
    exibirCardLoader();
    if(validarEtapa1FormularioCadastro(usuario)){
      api.put("/usuario", {...usuario})
      .then(() => {
        exibirMessageBox(
          true,
          "",
          "Dados atualizados com sucesso"
        )
      })
      .catch((error) => {
        tratarErro("", error);
      });
    }
  }

  const recuperarSenha = () => {
    exibirCardLoader();
    if(validarFormularioRecuperarSenha(usuario)){
      api.put("/usuario/recuperarSenha", {...usuario})
      .then((resp) => {
        exibirMessageBox(
          true,
          "/login",
          resp.data
        );
      })
      .catch((error) => {
        tratarErro("", error);
      });
    }
  }

  const trocarSenha = () => {
    exibirCardLoader();
    if(validarFormularioTrocarSenha(usuario)){
      api.put("/usuario/alterarSenha", {...usuario})
      .then((resp) => {
        esconderFormTrocarSenha();
        exibirMessageBox(
          true,
          "",
          resp.data
        );
      })
      .catch((error) => {
        tratarErro("", error);
      });
    }
  }

  const enviarFormularioCadastro = (e) => {
    e.preventDefault();
    fazerCadastro();
  }

  const enviarFormularioLogin = (e) => {
    e.preventDefault();
    fazerLogin();
  }

  const enviarFormularioAtualizarCadastro = (e) => {
    e.preventDefault();
    atualizarCadastro();
  }

  const enviarFormularioRecuperarSenha = (e) => {
    e.preventDefault();
    recuperarSenha();
  }

  const enviarFormularioTrocarSenha = (e) => {
    e.preventDefault();
    trocarSenha();
  }
  
  return{
    usuario, preencherUsuario,
    enviarFormularioCadastro, enviarFormularioLogin, enviarFormularioAtualizarCadastro, 
    enviarFormularioRecuperarSenha, enviarFormularioTrocarSenha
  };
}

export default useUSuario;