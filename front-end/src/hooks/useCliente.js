//Hooks
import { useEffect, useState } from "react";
import useSession from './useSession';
import useMessageBox from './useMessageBox';
import useTratarErro from './useTratarErro';
import { useLocation, useParams } from "react-router-dom";
import useValidacoes from "./useValidacoes";
import useFiltros from "./useFiltros";
import useLoader from "./useLoader";

//Services
import api from '../services/api';


const useCliente = () =>  {
  
  const {codigo} = useSession();
  const {exibirMessageBox} = useMessageBox();
  const {tratarErro} = useTratarErro();
  const [cliente, setCliente] = useState({});
  const location = useLocation();
  const {id} = useParams();
  const {validarFormularioLCliente} = useValidacoes();
  const {exibirConteudo} = useFiltros();
  const {exibirCardLoader} = useLoader();

  const buscarClienteComoUsuario = () => {
    api.get("/cliente/".concat(codigo)+"/".concat(id))
    .then((resp) => {
      setCliente(resp.data);
      definirDias(resp.data.mes);
    })
    .catch((error) => {
      tratarErro('', error)
    });
  }

  const buscarClienteComoAdmin = () => {
    api.get("/cliente/".concat(id))
    .then((resp) => {
      setCliente(resp.data);
      definirDias(resp.data.mes);
    })
    .catch((error) => {
      tratarErro('', error)
    });
  }

  useEffect(() => {
    if(["/cliente/".concat(id), "/editarCliente/".concat(id)].includes(location.pathname) && exibirConteudo === "dados"){
      buscarClienteComoUsuario();
    }
  }, [exibirConteudo]);

  useEffect(() => {
    if('/adm/cliente/'.concat(id) == location.pathname && exibirConteudo === "dados"){
      buscarClienteComoAdmin();
    }
  }, [exibirConteudo]);

  const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const [dias, setDias] = useState([]);

  const anos = () => {
    let anos = []
    for(let i = 2023; i >= 1940; i--){
      anos.push(i)
    }

    return anos;
  }

  const definirMes = (mes) => {
    definirDias(mes);
    setCliente({...cliente,
      ['dia'] : "escolha",
      ['mes'] : mes
    });
  }

  const definirDias = (mes) => {
    let dias = [];
    for(let i = 1; i <= (
      ["1", "3", "5", "7", "8", "10", "12"].includes(mes) ? 31 
        : ["4", "6", "9", "11"].includes(mes) ? 30 : 28
      ); i++){
      dias.push(i);
    }
    setDias(dias);
  }

  const preencherCliente = (e) => setCliente({...cliente, [e.target.name] : e.target.value});

  const adcionarCliente = () => {
    exibirCardLoader();
    if(validarFormularioLCliente(cliente)){
      api.post("/cliente/".concat(codigo), {
        ...cliente,
        dataNascimento: ((cliente.dia < 10) ? "0" : "").concat(cliente.dia)+"/"+((cliente.mes < 10) ? "0" : "").concat(cliente.mes)+"/"+cliente.ano
      })
      .then(() => {
        exibirMessageBox(
          true,
          "/clientes",
          "Cliente adcionado com sucesso!"
        )
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }

  const atualizarCliente = () => {
    exibirCardLoader();
    if(validarFormularioLCliente(cliente)){
      api.put("/cliente", {
        ...cliente,
        dataNascimento: ((cliente.dia < 10) ? "0" : "").concat(cliente.dia)+"/"+((cliente.mes < 10) ? "0" : "").concat(cliente.mes)+"/"+cliente.ano
      })
      .then(() => {
        exibirMessageBox(
          true,
          "/cliente/".concat(cliente.codigo),
          "Cliente atualizado com sucesso!"
        )
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }

  const excluirCliente = (codigo) => {
    exibirCardLoader();
    api.delete("/cliente/".concat(codigo))
    .then(() => {
      exibirMessageBox(
        true,
        "/clientes",
        "Cliente excluído com sucesso!"
      );
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const enviarFormularioAdcionarCliente = (e) => {
    e.preventDefault();
    adcionarCliente();
  }

  const enviarFormularioAtualizarCliente = (e) => {
    e.preventDefault();
    atualizarCliente();
  }


  return{
    meses, dias, anos, definirDias, definirMes, 
    preencherCliente, cliente,
    enviarFormularioAdcionarCliente, enviarFormularioAtualizarCliente, excluirCliente
  };
}

export default useCliente;