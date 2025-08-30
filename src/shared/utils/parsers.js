export function parseBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.trim().toLowerCase() === 'true';
  return false;
}

export function parseNumber(value) {
  const num = Number(value);
  return isNaN(num) ? null : num;
}

export function parseDate(value) {
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}