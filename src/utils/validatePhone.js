// valida o telefone do usuário
export default function phone(value) {
  if (!value) return false;

  value = value.replace(/[^\d]+/g, "");

  if (value.length !== 11) return false;

  if (value.match(/[a-z]/i)) return false;

  return true;
}