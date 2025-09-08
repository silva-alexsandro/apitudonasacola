export class ListShareDTO {
  constructor({ token, permission }) {
    this.share_url = `http://localhost:3000/list/share/${token}`;
    this.permission = permission;
  }
}
