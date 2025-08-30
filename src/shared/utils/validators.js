export function isValidItemName(name) {
  if (!name) return false;
  if (typeof name !== 'string') return false;
  if (name.trim().length < 3) return false;
  return true;
}

export function isValidPrice(price) {
  return typeof price === 'number' && price >= 0;
}

export function isValidAmount(amount) {
  return Number.isInteger(amount) && amount >= 1;
}

export function isValidDone(done) {
  return typeof done === 'boolean';
}
export function isValidUnit(unit) {
  const allowedUnits = ['g', 'kg', 'ml', 'l', 'un', 'dz', 'lata', 'garrafa', 'cx', 'pct'];
  return typeof unit === 'string' && allowedUnits.includes(unit);
}

export function isValidListName(name) {
  if (!name) return false;
  if (typeof name !== 'string') return false;
  if (name.trim().length < 3) return false;
  return true;
}

export function isEmptyListUpdate(name, is_archived, is_favorite) {
  return name === undefined &&
    is_archived === undefined &&
    is_favorite === undefined;
}

export function isEmptyItemUpdate(data) {
  if (!data || typeof data !== 'object') return true;
  const validKeys = ['price', 'amount', 'done', 'unit'];
  return !validKeys.some(key => key in data);
}
export function validateItemUpdate(data) {
  if (isEmptyItemUpdate(data)) {
    throw new Error('Nenhum campo válido para atualizar.');
  }

  if (data.price !== undefined && !isValidPrice(data.price)) {
    throw new Error('Preço deve ser um número positivo.');
  }

  if (data.amount !== undefined && !isValidAmount(data.amount)) {
    throw new Error('Quantidade deve ser um inteiro maior ou igual a 1.');
  }

  if (data.done !== undefined && !isValidDone(data.done)) {
    throw new Error('O campo "done" deve ser verdadeiro ou falso.');
  }
  if (data.unit !== undefined && !isValidUnit(data.unit)) {
    throw new Error('Unidade inválida. Use uma das opções: G, KG, ML, L, UN, DZ, PC, CX, PCT.');
  }
}