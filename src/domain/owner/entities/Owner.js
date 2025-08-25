export class Owner {
  constructor({ id, createdAt, lastActive }) {
    this.id = id;
    this.createdAt = createdAt || new Date();
    this.lastActive = lastActive || new Date();
  }

  updateLastActive() {
    this.lastActive = new Date();
  }
}
