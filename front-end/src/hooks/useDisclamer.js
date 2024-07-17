import { useContext } from "react";
import { DisclamerContext } from "../contexts/DisclamerContext";

const useDisclamer = () => {

  const {visibilidadeDisclamer, esconderDisclamer} = useContext(DisclamerContext);
  return {visibilidadeDisclamer, esconderDisclamer};
}

export default useDisclamer;