const formatarCPF = (cpf) => {

  return(cpf.substring(0, 3)+"."+cpf.substring(3, 6)+"."+cpf.substring(6, 9)+"-"+cpf.substring(9, 11));
}

export default formatarCPF;