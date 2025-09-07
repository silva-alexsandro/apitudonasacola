
export class ListDTO {
  constructor({ id, name, archived, favorite, ownerId, createdAt }) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.archived = archived;
    this.favorite = favorite;
    this.createdAt = createdAt;
  }
}