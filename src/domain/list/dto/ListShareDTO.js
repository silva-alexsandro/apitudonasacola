export class ListShareDTO {
  constructor({ list_id, permission }) {
    if (!list_id || !permission) throw new Error('Invalid DTO');
    if (!['read', 'edit'].includes(permission)) {
      throw new Error('Permission must be "read" or "edit"');
    }

    this.list_id = list_id;
    this.permission = permission;
  }
}
