// Valida o ISBN
export default function isbn(value) {
  if (!value) return false;

  value = value.replace(/[^\d]+/g, "");

  if (value.length !== 13) return false;

  if (value.match(/[a-z]/i)) return false;

  return true;
}