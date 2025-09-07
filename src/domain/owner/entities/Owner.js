export class Owner {
  constructor({ id, createdAt, lastActive }) {
    this.id = id;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt || Date.now());
    this.lastActive = lastActive instanceof Date ? lastActive : new Date(lastActive || Date.now());
  }

  updateLastActive() {
    this.lastActive = new Date();
  }
}
