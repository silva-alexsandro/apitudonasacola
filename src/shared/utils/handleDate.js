export function getNewDate() {
  return new Date();
}

export function getTomorrow(time) {
  return new Date(time.getTime() + 24 * 60 * 60 * 1000);
}