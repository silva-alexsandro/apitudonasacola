import { getNewDate, getTomorrow } from '../../../shared/utils/handleDate.js';
import { v4 as uuidv4 } from 'uuid';

export class ListShare {
 constructor({ id, list_id, token, permission, expires_at, created_at }) {
  this.id = id;
  this.list_id = list_id;
  this.token = token;
  this.permission = permission;
  this.expiresAt = expires_at;
  this.createdAt = created_at;
 }

 static create({ list_id, permission }) {
  const token = uuidv4();
  const createdAt = getNewDate();
  const expiresAt = getTomorrow(createdAt);

  return new ListShare({
   list_id,
   token,
   permission,
   expires_at: expiresAt,
   created_at: createdAt,
  });
 }
}
