//Hooks
import { useEffect, useState } from "react";
import useMessageBox from "./useMessageBox";
import { useParams } from "react-router-dom";
import useTratarErro from "./useTratarErro";
import useFormularios from "./useFormularios";
import useLoader from "./useLoader";
import useValidacoes from "./useValidacoes";

//Services
import api from "../services/api";


const useArquivos = () => {

  const [arquivo, setArquivo] = useState();
  const {exibirMessageBox} = useMessageBox();
  const {id} = useParams();
  const {tratarErro} = useTratarErro();
  const {esconderFormArquivos} = useFormularios();
  const {alterarVisibilidadeLoader, exibirCardLoader} = useLoader();
  const {validarFormularioArquivo} = useValidacoes();

  const preencherArquivo = (e) => setArquivo(e.target.files[0]);

  const adcionarArquivo = (e, codigoCliente) => {
    exibirCardLoader();
    e.preventDefault();

    const formData = new FormData();

    formData.append("arquivoBruto", arquivo);

    if(validarFormularioArquivo(arquivo)){
      api.post("/arquivo/".concat(codigoCliente), 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(() => {
        exibirMessageBox(
          true,
          "",
          "Imagem adcionada com sucesso!",
          false,
          true
        );
        removerArquivo();
        esconderFormArquivos();
      })
      .catch((error) => {
        removerArquivo();
        tratarErro("", error);
      });
    }else removerArquivo();
  }

  const removerArquivo = () => setArquivo(null);

  const excluirArquivo = (codigoArquivo) => {
    exibirCardLoader();
    api.delete("/arquivo/".concat(codigoArquivo))
    .then(() => {
      listarArquivos();
      exibirMessageBox(
        true,
        "",
        "Imagem excluída com sucesso!"
      );
    })
    .catch((error) => {
      tratarErro("", error);
    });
  }

  const fazerDownload = (codigo) => {
    api.get("/arquivo/".concat(codigo))
    .then((resp) => {
      let uri = (
        ["png", "jpg", "jpge", "jfif"].includes(resp.data.extensao) 
        ? "data:image/png;base64," 
        : "data:application/pdf;base64,"
      ).concat(resp.data.bytes);

      let nome = resp.data.nomeArquivo;

      let link = document.createElement("a");
      link.download = nome;
      link.href = uri;
      link.click();
    })
    .catch((error) => {
      tratarErro("", error);
    })
  }

  const [arquivos, setArquivos] = useState([]);

  const listarArquivos = () => {
    api.get("/arquivo/arquivosDeUmCliente/".concat(id))
    .then((resp) => {
      alterarVisibilidadeLoader(resp.data);
      setArquivos(resp.data);
    })
    .catch((error) => {
      tratarErro("", error);
    });
  }

  useEffect(() => {
    listarArquivos();
  }, []);

  return{
    arquivo, preencherArquivo, adcionarArquivo, removerArquivo, 
    arquivos, excluirArquivo, fazerDownload
  };
}

export default useArquivos;