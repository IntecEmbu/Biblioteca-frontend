// Valida o ano
export default function year(value) {
  if (!value) return false;

  value = value.replace(/[^\d]+/g, "");

  if (value.length !== 4) return false;

  if (value.match(/[a-z]/i)) return false;

  if(value > new Date().getFullYear()) return false;

  return true;
}