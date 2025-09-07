export class List {
  constructor({ id, name, archived, favorite, ownerId, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.archived = archived ;
    this.favorite = favorite ;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}