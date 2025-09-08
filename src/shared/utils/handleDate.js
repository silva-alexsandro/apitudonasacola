export function getNewDate() {
  return new Date();
}
export function getTomorrow(time = new Date()) {
  return new Date(time.getTime() + 24 * 60 * 60 * 1000);
}