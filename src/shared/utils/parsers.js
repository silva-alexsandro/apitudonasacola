/**
 * Converte um valor para booleano.
 * Aceita boolean ou string ("true"/"false").
 * Outros valores serão tratados como false.
 */
export function parseBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.trim().toLowerCase() === 'true';
  return false;
}

/**
 * Converte um valor para número.
 * Retorna null se não for possível converter.
 */
export function parseNumber(value) {
  const num = Number(value);
  return isNaN(num) ? null : num;
}

/**
 * Converte um valor para uma instância Date válida.
 * Retorna null se for inválida.
 */
export function parseDate(value) {
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}
