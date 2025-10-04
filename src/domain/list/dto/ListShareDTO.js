export class ListShareDTO {
 constructor({ token, permission }) {
  this.share_url = `/list/share/${token}`;
  this.permission = permission;
 }
}
