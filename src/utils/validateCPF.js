import { cpf } from "cpf-cnpj-validator";

// Valida cpf
export default function(value){
  if (!value) return false;

  value = value.replace(/[^\d]+/g,'');

  return cpf.isValid(value); 
}